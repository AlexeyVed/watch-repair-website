'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      email: 'admin@example.com',
      password: 'passwordsecret'
    }], {})
      .catch(() => {
        return null
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {})
  }
}
