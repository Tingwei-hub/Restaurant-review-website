var mysql = require('mysql');
var connection = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'restaurant_review'
});
module.exports = connection;
