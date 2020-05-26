var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

var dao = require('./dao/dao'); 

// Return a simple HTTP response by default
app.get('/', function(req, res){
    res.send('<h1> OL.Chat Server </h1>');
});

// Test getting all topics
dao.getAllTopics();  

// Socket implementation
io.on('connection', function (socket){
    console.log('A user connected');
    socket.on('chat message', function(msg){
        console.log('message: ' + JSON.stringify(msg)); 
        io.emit('chat message', msg);
    });
});

http.listen(3001, function(){
    console.log('Listening...');
});