const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = 3000;

app.get('/', function(req, res, next){
    res.end('Hola Amegos!');
});

app.listen(port, hostname, () =>{
    console.log(`the server is running on ${hostname}:${port}`);
});