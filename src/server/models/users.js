const requestToDB = require('../services/modules.js')

module.exports = class User {
  constructor (email, password) {
    this.email = email
    this.password = password
  }

  registration () {
    return requestToDB(`INSERT INTO login (email, password) VALUES (?, ?)`, [this.email, this.password])
  }

  login () {
    return requestToDB('SELECT email, password FROM login where email=?', [this.email])
  }

  static getAll () {
    return requestToDB(`SELECT * FROM login`)
  }
}
