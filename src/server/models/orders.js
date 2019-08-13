const Sequelize = require('sequelize')
const sequelize = require('../db/db-connection-config.js')
const Customer = require('./customers.js')
const Clock = require('./clocks.js')
const City = require('./cities.js')
const Master = require('./masters.js')

const Order = sequelize.define('orders', {
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
