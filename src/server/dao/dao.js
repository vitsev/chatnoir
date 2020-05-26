//methods for fetching mysql data  
var connection = require('../connection/db_connection');  
  
function DAO() {  
  
    // get all users data   
    this.getAllTopics = function (res) {  
        // initialize database connection  
        connection.init();  
        // calling acquire methods and passing callback method that will be execute query  
        // return response to server   
        connection.acquire(function (err, con) {  
            con.query('SELECT * FROM ChatDB.chat', function (err, result) {  
                con.release(); 
                console.log(result); 
                // res.send(result);  
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