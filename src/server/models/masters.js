const Sequelize = require('sequelize')
const db = require('../db/db-connection-config.js')
const City = require('./cities.js')

const Master = db.define('masters', {
  name: {
    type: Sequelize.STRING(191),
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
},
{
  createdAt: false,
  updatedAt: false
})

City.hasMany(Master)

Master.belongsTo(City)

module.exports = Master
