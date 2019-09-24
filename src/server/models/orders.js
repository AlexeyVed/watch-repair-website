const Sequelize = require('sequelize')
const db = require('../db/db-connection.js')
const Customer = require('./customers.js')
const Clock = require('./clocks.js')
const City = require('./cities.js')
const Master = require('./masters.js')

const Order = db.define('orders', {
  date: {
    type: Sequelize.STRING(191),
    allowNull: false
  },
  time: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
},
{
  createdAt: false,
  updatedAt: false
})

Customer.hasMany(Order)
Clock.hasMany(Order)
City.hasMany(Order)
Master.hasMany(Order)

Order.belongsTo(Customer)
Order.belongsTo(Clock)
Order.belongsTo(City)
Order.belongsTo(Master)

module.exports = Order
