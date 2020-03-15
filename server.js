const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const session = require('express-session');

const hostname = 'https://amigochat-nodejs.herokuapp.com/' ;
const port =  process.env.PORT || 3000;

app.use(express.static('public'));
app.use(session({
    secret: 'chatsession',
    saveUninitialized: true,
    resave: true
}));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/chatroom.html');
});

app.get('/chatstore', function(req, res){
    res.send(global.username+' : '+global.latestmessage);
});

io.on('connection', function(socket){
    /*
    client.push({id : socket.client.id});
    console.log(client);

    var getClientID = client.find(e => (e.id === socket.client.id));
    if(getClientID){
//        socket.on('latestmessage',history);
    }
*/
    socket.on('username', function(username){
        if(username == null || " "){
            socket.username = 'Anonymous';
        }else {
            socket.username = username;
        };
        io.emit('online','<center><i>'+socket.username+' join the chat...</i></center>');
        console.log(`User "${socket.username}" connected`);
    });

    socket.on('disconnect', function(username){
        io.emit('online','<center><i>'+socket.username+' left the chat...</i></center>');
        console.log(`User "${socket.username}" disconnected`);
    });

    socket.on('chatting', function(msg){
        global.latestmessage = msg;
        global.username = socket.username;
//        history.push(socket.username+' : '+msg);
//        console.log('latest chat session : ',history);
        io.emit('chatting',socket.username+' : '+msg);
        console.log(socket.username+' : '+msg);
        console.log(typeof(msg));
    });
/*
    socket.on('chathistory',function(username){
        history.push(username);
        console.log(history);
        io.emit(username);
    });
  */      
});

server.listen(port, function() {
    console.log(`the server is running on ${hostname}:${port}`);
});