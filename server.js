const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const hostname = '127.0.0.1';
const port = 3000;

app.use(express.static('public'));

app.get('/',function(req, res){
    console.log('VIRGIN DETECTED')
    res.write('HELLO VIRGIN!');    
    res.end();
});

app.get('/CHADroom', function(req, res){
    console.log('Enter the CHADroom');
    res.sendFile(__dirname + '/chatroom.html');
});

server.listen(port, () =>{
    console.log('this is server.listen');
    console.log(`the server is running on ${hostname}:${port}`);
});

io.on('connection', function(socket){
    console.log('a CHAD connected');
    socket.on('disconnect', function(){
        console.log('a CHAD has gone... left only virgin!');
    });

    socket.on('chatting',function(msg){
        console.log('a CHAD says :',msg);

        io.emit('chatting',msg);
    });
});