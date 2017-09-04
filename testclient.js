const client = require('socket.io-client')


var socket = client.connect('ws://localhost:15000', {reconnect: true})

socket.on('connect', function (socket) {
    console.log('Connected!');
});
socket.emit('CH01', 'me', 'test msg');

socket.emit('send_class_to_compile', {data: 'here is some data'})