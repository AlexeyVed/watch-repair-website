const Sequelize = require('sequelize')
const config = require('../config/config.js')

let dbConfig = config.db

const db = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  dialect: dbConfig.dialect,
  host: dbConfig.host,
  port: dbConfig.port,
  pool: dbConfig.pool
})

module.exports = db
