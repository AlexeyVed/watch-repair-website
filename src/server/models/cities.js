const requestToDB = require('../services/modules.js')

module.exports = class City {
  constructor (email, password) {
    this.email = email
    this.password = password
  }

  static getAll () {
    return requestToDB(`SELECT * FROM cities`)
  }
}
