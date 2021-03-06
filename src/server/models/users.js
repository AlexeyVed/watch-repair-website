const Sequelize = require('sequelize')
const db = require('../db/db-connection.js')

const User = db.define('users', {
  email: {
    type: Sequelize.STRING(191),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING(191),
    allowNull: false
  }
},
{
  createdAt: false,
  updatedAt: false
})

User.validPassword = (password, passwordFromDb) => {
  return (password === passwordFromDb)
}

module.exports = User
