const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('public'));
/*
app.get('/',function(req, res){
    console.log('VIRGIN DETECTED')
    res.write('HELLO VIRGIN!');    
    res.end();
});
*/
app.get('/', function(req, res){
    console.log('Enter the CHADroom');
    res.sendFile(__dirname + '/chatroom.html');
});

io.on('connection', function(socket){
    console.log('a CHAD connected');

    socket.on('username', function(username){
        socket.username = username;
        io.emit('online','<center><i>'+socket.username+' join the chat...</i></center>');
    });

    socket.on('disconnect', function(username){
        io.emit('online','<center><i>'+socket.username+' left the chat...</i></center>');
    });

    socket.on('chatting',function(msg){
        console.log('a CHAD says :',msg);
        io.emit('chatting',socket.username+' : '+msg);
    });
});

server.listen(port, () =>{
    console.log(`the server is running on ${hostname}:${port}`);
});