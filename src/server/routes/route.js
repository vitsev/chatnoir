// Custom route for fetching data  
var dao = require('../dao/dao');  
  
module.exports = {  
    // Set up route configuration that will be handle by express server  
    configure: function (app) {  
  
        // Adding route for topics, here app is express instance which provide use  
        // get method for handling get request from http server   
        app.get('/api/topics', function (req, res) {  
            dao.getAllTopics(res);  
        });  
/*
        // Here we get id from request and passing to it transaction method  
        app.get('/api/transactions/:id/', function (req, res) {  
            dao.getTransactionById(req.params.id, res);  
        });  
*/
    }
}