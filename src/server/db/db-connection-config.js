const Sequelize = require('sequelize')
const devConfig = require('../config/devConfig.js').db
const prodConfig = require('../config/prodConfig.js').db

const mode = process.env.NODE_ENV || 'development'

let dbConfig = (mode === 'production') ? prodConfig : devConfig

const db = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  dialect: dbConfig.dialect,
  host: dbConfig.host,
  port: dbConfig.port,
  pool: dbConfig.pool
})

module.exports = db
