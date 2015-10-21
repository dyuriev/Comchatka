/**
 * FSChat v 3.0
 * @author Dmitriy Yuriev
 */

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
    //console.log(socket.client);
    console.log(socket.request.headers['user-agent']);
    console.log(socket.id);
    console.log(io.sockets.connected);
    //socket.broadcast.emit('SYSTEM_MESSAGE', 'В чат входит новый пользователь'); //всем, кроме самого юзера
    //socket.emit('SYSTEM_MESSAGE', 'Вы присоединились в разговору');  //самому юзеру
    io.emit('SYSTEM_MESSAGE', 'В чат входит новый пользователь'); //всем
    
    socket.on('USER_MESSAGE', function(msg){
        console.log('message: ' + msg);
        io.emit('USER_MESSAGE', msg);
    });

    socket.on('PRIVATE_MESSAGE', function (from, msg) {
        console.log('I received a private message by ', from, ' saying ', msg);
    });

    socket.on('disconnect', function(){
        socket.broadcast.emit('SYSTEM_MESSAGE', 'Пользователь покидает чат'); //всем, кроме самого юзера
    });
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});
