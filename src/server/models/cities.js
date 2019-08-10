const Sequelize = require('sequelize')
const sequelize = require('../db/db-connection-config.js')

const City = sequelize.define('cities', {
  city: {
    type: Sequelize.STRING(191),
    allowNull: false
  }
},
{
  createdAt: false,
  updatedAt: false
})

module.exports = City
