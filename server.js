//server.js
var io = require('socket.io').listen(15000);
const { exec } = require('child_process');

io.on('connection', function (socket){
   console.log('connection');

  socket.on('send_class_to_compile', function (data) {
    exec('"C:\\Program Files\\Java\\jdk1.8.0_144\\bin\\javac" ./Java/TestApp.java', (err, stdout, stderr) => {
        console.log('trying to execute')
      if (err) {
        console.error(err);
        return;
      }
      exec('"C:\\Program Files\\Java\\jdk1.8.0_144\\bin\\java" Java/TestApp', (err, stdout, stderr) => {
          if(err){
              console.error(err)
              return
          }

          console.log('Ran java class successfully')
          console.log('Output: ')
          console.dir(stdout)
      })
    });
  });

  socket.on('disconnect', ()=> {
      console.log('client disconnected')
  })

});
