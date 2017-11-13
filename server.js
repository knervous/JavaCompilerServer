//server.js
var io = require('socket.io').listen(15000);
const { exec } = require('child_process');
const fs = require('fs')

console.log('server listening on port 15000')


io.on('connection', function (socket){
   console.log('connection');

  socket.on('send_class_to_compile', async function (res) {
   
    fs.writeFile('Java/TestApp.java', res.data, (err) => {
      exec('"%JAVA_HOME%/bin/javac" ./Java/TestApp.java', (err, stdout, stderr) => {
        console.log('trying to execute')
      if (err) {
        socket.emit('receive_error', err.toString())
        console.error(err);
        return;
      }
      exec('"%JAVA_HOME%/bin/java" Java/TestApp', (err, stdout, stderr) => {
          if(err){
              socket.emit('receive_error', err.toString())
              console.error(err)
              return
          }

          console.log('Ran java class successfully')
          console.log('Output: ')
          console.dir(stdout)
          socket.emit('receive_output', stdout)
      })
    });

    })

    
  });

  socket.on('disconnect', ()=> {
      console.log('client disconnected')
  })

});
