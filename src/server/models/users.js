const service = require('../services/modules.js')

module.exports = class User {
  constructor (values) {
    this.values = values
  }

  registration () {
    const { email, password } = this.values
    const values = [email, password]
    return service.requestToDB(`INSERT INTO login (email, password) VALUES (?, ?)`, values)
  }

  check () {
    const { email } = this.values
    return service.requestToDBCheck(`SELECT email FROM login where email= "${email}"`)
  }

  login () {
    const { email } = this.values
    return service.requestToDB(`SELECT email, password FROM login where email= "${email}"`)
  }
}
