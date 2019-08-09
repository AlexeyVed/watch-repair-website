const Sequelize = require('sequelize')

const sequelize = new Sequelize('clockwise', 'root', 'e8zbprhH', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
})

sequelize.sync()

module.exports = sequelize
