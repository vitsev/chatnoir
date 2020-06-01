// Establish MySQL connection  
var mysql = require('mysql');

function DBConnection() {
    this.pool = null;  
    
    // Init MySQL connection pool  
    this.init = function() {  
        this.pool = mysql.createPool({  
            connectionLimit: 10,  
            host: "chat-db.c7wp09djtllp.us-east-2.rds.amazonaws.com",
            user: "admin",
            password: "admin123",
            database: 'ChatDB'  
        });  
    };  
  
    // Acquire connection and execute query on callbacks  
    this.acquire = function(callback) {  
        this.pool.getConnection(function(err, connection) {
            // Check for error
            if (err) throw err;
  
            callback(err, connection);
        });  
    };  
}  
  
module.exports = new DBConnection();  
