// Server implementation

var express = require('express');  
var cors = require('cors');
var routes = require('./routes/route');  
var config = require('./server_config'); 
// var bodyparser = require('body-parser');  
  
// Creating express server for handling HTTP requests + Socket.io
var app = express(); 
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(cors());
// for posting nested object if we have set extended true  
// app.use(bodyparser.urlencoded({ extended : true}));  
// parsing JSON  
// app.use(bodyparser.json());  

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

var server = http.listen(config.APP_PORT, function(){
    console.log('Server listening on port ' + server.address().port);  
});
