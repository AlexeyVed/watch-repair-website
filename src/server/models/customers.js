const Sequelize = require('sequelize')
const sequelize = require('../db/db-connection-config.js')

const Customer = sequelize.define('customers', {
  name: {
    type: Sequelize.STRING(191),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(191),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
},
{
  createdAt: false,
  updatedAt: false
})

module.exports = Customer
