const Sequelize = require('sequelize')

const mysql = new Sequelize('clockwise', 'root', 'e8zbprhH', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

const postgresql = new Sequelize('clockwise', 'root', 'e8zbprhH', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

const db = mysql || postgresql

module.exports = db
