const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'localhost',
  user: 'root',
  password: 'e8zbprhH',
  database: 'clockwise',
  port: 3306
})

module.exports = pool
