const Sequelize = require('sequelize')
const sequelize = require('../db/db-connection-config.js')

const Clock = sequelize.define('clocks', {
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
