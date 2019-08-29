const Sequelize = require('sequelize')
const config = require('../config/config.js')

const mode = process.env.NODE_ENV || 'development'

let dbConfig = (mode === 'production') ? config.db.postgresql : config.db.mysql

const db = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  dialect: dbConfig.dialect,
  host: dbConfig.host,
  port: dbConfig.port,
  pool: dbConfig.pool
})

module.exports = db
