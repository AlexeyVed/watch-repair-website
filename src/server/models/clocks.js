const requestToDB = require('../services/modules.js')

module.exports = class Clock {
  constructor (email, password) {
    this.email = email
    this.password = password
  }

  static getAll () {
    return requestToDB(`SELECT * FROM clocks`)
  }
}
