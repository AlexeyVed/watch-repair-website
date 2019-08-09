const Sequelize = require('sequelize')
const sequelize = require('../db/db-connection-config.js')

module.exports = sequelize.define('users', {
  email: {
    type: Sequelize.STRING(191),
    allowNull: false
  },
  password: {
    type: Sequelize.STRING(191),
    allowNull: false
  }
})

/*
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
*/
