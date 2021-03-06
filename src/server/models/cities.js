const Sequelize = require('sequelize')
const db = require('../db/db-connection.js')

const City = db.define('cities', {
  name: {
    type: Sequelize.STRING(191),
    allowNull: false
  }
},
{
  createdAt: false,
  updatedAt: false
})

module.exports = City
