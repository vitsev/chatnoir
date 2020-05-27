// Methods for fetching MySQL data  
var connection = require('../connection/db_connection');  
  
function DAO() {  
  
    // Get all Topics data   
    this.getTopics = function (user_id, res) {  
        // initialize database connection  
        connection.init();  
        // calling acquire methods and passing callback method that will be execute query  
        // return response to server   
        connection.acquire(function (err, con) {  
            con.query('SELECT chat_id, chat_topic from chat INNER JOIN user_chat on chat.chat_id = user_chat.user_chat_chat_id ' + 
                      'WHERE user_chat.user_chat_user_id =' + user_id, function (err, result) {  
                con.release(); 
                res.send(result);  
            });  
        });  
    };  

    // Get all Users data   
    this.getAllUsers = function (res) {  
        // initialize database connection  
        connection.init();  
        // calling acquire methods and passing callback method that will be execute query  
        // return response to server   
        connection.acquire(function (err, con) {  
            con.query('SELECT * FROM ChatDB.user', function (err, result) {  
                con.release(); 
                res.send(result);  
            });  
        });  
    }; 

  /*
    this.getTransactionById = function (id, res) {  
        // initialize database connection  
        connection.init();  
        // get id as parameter to passing into query and return filter data  
        connection.acquire(function (err, con) {  
            var query = 'SELECT date_format(t.TransactionDate,\'%d-%b-%Y\') as date, ' +  
                'CASE WHEN t.TransactionAmount >= 0 THEN t.TransactionAmount ' +  
                'ELSE 0 END AS Credit, CASE WHEN t.TransactionAmount < 0 THEN ' +  
                't.TransactionAmount ELSE 0 END AS Debit, t.Balance FROM ' +  
                'transactions t INNER JOIN users u ON t.UserId=u.UserID WHERE t.UserId = ?;';  
            con.query(query, id, function (err, result) {  
                    con.release();  
                    res.send(result);  
                });  
        });  
    };  
  */
}  
  
module.exports = new DAO(); 