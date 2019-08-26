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

const postgresql = new Sequelize('ddhe17nk5stidt', 'cytndkmrdjztds', '4c34a00ed10369edd02a851b6200870c26ab195d470c0379d1004e908769d84d', {
  dialect: 'postgres',
  host: 'ec2-174-129-242-183.compute-1.amazonaws.com',
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const db = postgresql

module.exports = db
