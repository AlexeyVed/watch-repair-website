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
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
},
{
  createdAt: false,
  updatedAt: false
})

Customer.hasMany(Order, {
  foreignKey: 'customer_id'
})
Clock.hasMany(Order, {
  foreignKey: 'clock_id'
})
City.hasMany(Order, {
  foreignKey: 'city_id'
})
Master.hasMany(Order, {
  foreignKey: 'master_id'
})

Order.belongsTo(Customer, {
  foreignKey: 'customer_id'
})
Order.belongsTo(Clock, {
  foreignKey: 'clock_id'
})
Order.belongsTo(City, {
  foreignKey: 'city_id'
})
Order.belongsTo(Master, {
  foreignKey: 'master_id'
})

module.exports = Order
