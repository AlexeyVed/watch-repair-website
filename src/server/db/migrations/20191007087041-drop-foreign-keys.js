'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    const keysOrders = []
    const keysMaters = []

    return queryInterface.getForeignKeyReferencesForTable('orders')
      .then(res => {
        res.forEach(key => {
          keysOrders.push(key.constraintName)
        })
        return Promise.all(keysOrders.map(key => (queryInterface.removeConstraint('orders', key))))
      })
      .then(() => {
        return Promise.all(keysOrders.map(key => (queryInterface.removeIndex('orders', key))))
      })
      .then(() => {
        return queryInterface.getForeignKeyReferencesForTable('masters')
      })
      .then(res => {
        res.forEach(key => {
          keysMaters.push(key.constraintName)
        })
        return Promise.all(keysMaters.map(key => (queryInterface.removeConstraint('masters', key))))
      })
      .then(() => {
        return Promise.all(keysMaters.map(key => (queryInterface.removeIndex('masters', key))))
      })
  }
}
