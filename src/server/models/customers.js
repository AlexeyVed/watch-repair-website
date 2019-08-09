const Sequelize = require('sequelize')
const sequelize = require('../db/db-connection-config.js')

module.exports = sequelize.define('customers', {
  name: {
    type: Sequelize.STRING(191),
    allowNull: false
  },
  email: {
    type: Sequelize.STRING(191),
    allowNull: false
  }
})

/*
const service = require('../services/modules.js')

module.exports = class Customer {
  constructor (values) {
    this.values = values
  }

  update (values) {
    this.values = values
    const { email, name, id } = this.values
    const val = [ name, email, id]
    return service.requestToDB(`UPDATE customers SET name = ?, email = ?  WHERE id = ?`, val)
  }

  static findOne (id) {
    return service.requestToDB(`SELECT * FROM customers WHERE id = ${id}`)
  }

  static findByEmail (email) {
    return service.requestToDB(`SELECT id FROM customers WHERE email = "${email}"`)
  }

  static delete (id) {
    return service.requestToDB(`DELETE FROM customers WHERE id = ${id}`)
  }

  add () {
    const { name, email } = this.values
    return service.requestToDB(`INSERT INTO customers (name, email) VALUES (?, ?)`, [name, email])
  }

  static list () {
    return service.requestToDB(`SELECT * FROM customers`)
  }
}
*/
