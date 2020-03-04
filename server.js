const express = require('express');
const app = express();

const server = app.listen(3000, () =>{
    console.log('the server is running on port',server.address().port);
});