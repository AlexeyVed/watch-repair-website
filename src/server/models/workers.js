const requestToDB = require('../services/modules.js')

module.exports = class Worker {
  constructor (email, password) {
    this.email = email
    this.password = password
  }

  static getAll () {
    return requestToDB(`SELECT * FROM workers`)
  }
}
