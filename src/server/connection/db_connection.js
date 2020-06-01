// Establish MySQL connection  
var mysql = require('mysql');
var config = require('../server_config'); 

function DBConnection() {
    this.pool = null;  
    
    // Init MySQL connection pool  
    this.init = function() {  
        this.pool = mysql.createPool({  
            connectionLimit: 10,  
            host: config.DB_HOST,
            user: config.DB_USER,
            password: config.DB_PASSWORD,
            database: config.DB_NAME  
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
