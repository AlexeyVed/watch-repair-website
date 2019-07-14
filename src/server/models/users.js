const dbConnectionConfig = require('../db/db-connection-config')

function getConnection () {
  return mysql.createConnection(dbConnectionConfig)
}

module.exports = class User {
  constructor (email, password) {
    this.email = email
    this.password = password
  }

  save () {
    users.push(this)
  }

  static getAll () {
    return users
  }
}
