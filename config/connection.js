const mysql = require('mysql2');

require('dotenv').config();

const connection = mysql.createConnection({
  host: '127.0.0.01',
  port: 3306,
  user: 'root',
  password:'huanhuan',
  database: 'employees'
},
console.log(`Connected to the employees database.`)
);

module.exports = connection;
