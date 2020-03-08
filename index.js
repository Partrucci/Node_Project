const express = require('express');
const app = express();
const server = require('http').createServer(app);

const hostname = '127.0.0.1';
const port = 3000;

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

server.listen(port, function() {
    console.log(`the server is running on ${hostname}:${port}`);
});

console.log("Hola Amegos!")