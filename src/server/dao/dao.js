// Methods for fetching MySQL data  
var connection = require('../connection/db_connection');  
  
function DAO() {  
  
    // Get all users   
    this.getUsers = function (res) {  
        // initialize database connection  
        connection.init();  
        // calling acquire methods and passing callback method that will be execute query  
        // return response to server   
        connection.acquire(function (err, con) {  
            con.query('SELECT * FROM ChatDB.user', function (err, result) { 
                // Check for error
                if (err) throw err;

                con.release(); 
                res.send(result);  
            });  
        });  
    }; 

    // Get all the topics for a user {user_id}
    this.getTopics = function (user_id, res) {  
        // initialize database connection  
        connection.init();  
        // calling acquire methods and passing callback method that will be execute query  
        // return response to server   
        connection.acquire(function (err, con) {  
            con.query('SELECT chat_id, chat_topic from chat INNER JOIN user_chat on chat.chat_id = user_chat.user_chat_chat_id ' + 
                      'WHERE user_chat.user_chat_user_id =' + user_id, function (err, result) {
                // Check for error
                if (err) throw err;

                con.release(); 
                res.send(result);  
            });  
        });  
    };  

    // Get all the messages from all the topics for a user {user_id}
    this.getMessages = function (user_id, res) {  
        // initialize database connection  
        connection.init();  
        // calling acquire methods and passing callback method that will be execute query  
        // return response to server   
        connection.acquire(function (err, con) {  
            con.query('SELECT chat_id from chat INNER JOIN user_chat on chat.chat_id = user_chat.user_chat_chat_id ' + 
                        'WHERE user_chat.user_chat_user_id =' + user_id, function (c_err, c_result) {
                // Check for error
                if (c_err) throw err;
                
                const userTopics = c_result.map(topic => topic['chat_id']);
                // Result contains all chat topics for a given user
                con.query('SELECT * FROM ChatDB.message WHERE message.message_chat_id IN (' + userTopics.join(', ') + ')', function (err, result) {
                    // Check for error
                    if (err) throw err;
                    
                    con.release(); 
                    res.send(result);  
                });
            });  
        });  
    }; 
}  
  
module.exports = new DAO(); 