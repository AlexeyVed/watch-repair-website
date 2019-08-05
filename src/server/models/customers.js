const service = require('../services/modules.js')

module.exports = class Customer {
  constructor (values) {
    this.values = values
  }

  update (values) {
    this.values = values
    const { email, password, id } = this.values
    const val = [email, password, id]
    return service.requestToDB(`UPDATE customers SET email = ?, password = ?  WHERE id = ?`, val)
  }

  registration () {
    const { email, password } = this.values
    const values = [email, password]
    return service.requestToDB(`INSERT INTO customers (email, password) VALUES (?, ?)`, values)
  }

  check () {
    const { email } = this.values
    return service.requestToDBCheck(`SELECT email FROM customers where email= "${email}"`)
  }

  login () {
    const { email } = this.values
    return service.requestToDB(`SELECT email, password FROM customers where email= "${email}"`)
  }

  static findOne (id) {
    return service.requestToDB(`SELECT * FROM customers WHERE id = ${id}`)
  }

  static delete (id) {
    return service.requestToDB(`DELETE FROM customers WHERE id = ${id}`)
  }

  static list () {
    return service.requestToDB(`SELECT * FROM customers`)
  }
}
