const service = require('../services/modules.js')

module.exports = class User {
  constructor (values) {
    this.values = values
  }

  updateUser () {
    const { email, password, idlogin } = this.values
    const values = [email, password, idlogin]
    return service.requestToDB(`UPDATE login SET email = ?, password = ?  WHERE idlogin = ?`, values)
  }

  registration () {
    const { email, password } = this.values
    const values = [email, password]
    return service.requestToDB(`INSERT INTO login (email, password) VALUES (?, ?)`, values)
  }

  checkUser () {
    const { email } = this.values
    return service.requestToDBCheck(`SELECT email FROM login where email= "${email}"`)
  }

  login () {
    const { email } = this.values
    return service.requestToDB(`SELECT email, password FROM login where email= "${email}"`)
  }

  static deleteUser (idlogin) {
    return service.requestToDB(`DELETE FROM login WHERE idlogin = ${idlogin}`)
  }

  static getAll () {
    return service.requestToDB(`SELECT * FROM login`)
  }
}
