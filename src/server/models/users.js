const service = require('../services/modules.js')

module.exports = class User {
  constructor (email, password) {
    this.email = email
    this.password = password
  }

  registration () {
    return service.requestToDB(`INSERT INTO login (email, password) VALUES (?, ?)`, [this.email, this.password])
  }

  checkUser () {
    return service.requestToDBCheck('SELECT email FROM login where email=?', [this.email])
  }

  login () {
    return service.requestToDB('SELECT email, password FROM login where email=?', [this.email])
  }

  static deleteUser (idlogin) {
    return service.requestToDB(`DELETE FROM login WHERE idlogin = ?`, [idlogin])
  }

  static getAll () {
    return service.requestToDB(`SELECT * FROM login`)
  }
}
