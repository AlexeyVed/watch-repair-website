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

const postgresql = new Sequelize('dbn9cua6pcfq6m', 'pawllgmzgkumjo', '219fda9a0c93a8b6208af0b3a15694e3e49b12f1741feeff7300225deb0b67a2', {
  dialect: 'postgres',
  host: 'ec2-107-20-155-148.compute-1.amazonaws.com',
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
