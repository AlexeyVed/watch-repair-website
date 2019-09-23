const Sequelize = require('sequelize')
const db = require('../db/db-connection.js')

const Clock = db.define('clocks', {
  typeClock: {
    type: Sequelize.STRING(191),
    allowNull: false
  },
  timeRepair: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
},
{
  createdAt: false,
  updatedAt: false
})

module.exports = Clock
