// Server implementation

var express = require('express');  
var cors = require('cors');
const fs = require('fs');
var routes = require('./routes/route');  
var config = require('./server_config');   

// Certificate & Private key
const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

// Creating express server for handling HTTP requests + Socket.io
var app = express(); 
var https = require('https').createServer(options, app);
var io = require('socket.io')(https);

// Enable CORS for the server
app.use(cors());

// Set application route with server instance 
routes.configure(app);

// Socket implementation
io.on('connection', function (socket){
    console.log('A user connected!');
    socket.on('chat message', function(msg){
        console.log('new message: ' + JSON.stringify(msg)); 
        io.emit('chat message', msg);
    });
});

var server = https.listen(config.APP_PORT, function(){
    console.log('Server listening on port ' + server.address().port);  
});
