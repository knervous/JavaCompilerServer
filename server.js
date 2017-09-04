var io = require('socket.io')(process.env.PORT || 18000);
const { spawn } = require('child_process');

io.on('connection', (socket) => {
    console.log('we\`ve got a connection')
})