// Custom route for fetching data  
var dao = require('../dao/dao');  
  
module.exports = {  
    // Set up route configuration that will be handle by express server  
    configure: function (app) {  
  
        // Adding routes here 
        // App is express instance which provide get method for handling get request from http server   
        app.get('/api/topics/:user/', function (req, res) {  
            dao.getTopics(req.params.user, res);  
        });  
  
        app.get('/api/users', function (req, res) {  
            dao.getAllUsers(res);  
        }); 

    }
}