'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('masters', 'cityId', 'city_id')
      .then(() => {
        return queryInterface.renameColumn('cities', 'city', 'name')
      })
      .then(() => {
        return queryInterface.renameColumn('clocks', 'typeClock', 'name')
      })
      .then(() => {
        return queryInterface.renameColumn('clocks', 'timeRepair', 'duration')
      })
      .then(() => {
        return queryInterface.renameColumn('orders', 'customerId', 'customer_id')
      })
      .then(() => {
        return queryInterface.renameColumn('orders', 'cityId', 'city_id')
      })
      .then(() => {
        return queryInterface.renameColumn('orders', 'masterId', 'master_id')
      })
      .then(() => {
        return queryInterface.renameColumn('orders', 'clockId', 'clock_id')
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('masters', 'city_id', 'cityId')
      .then(() => {
        return queryInterface.renameColumn('cities', 'name', 'city')
      })
      .then(() => {
        return queryInterface.renameColumn('clocks', 'name', 'typeClock')
      })
      .then(() => {
        return queryInterface.renameColumn('clocks', 'duration', 'timeRepair')
      })
      .then(() => {
        return queryInterface.renameColumn('orders', 'customer_id', 'customerId')
      })
      .then(() => {
        return queryInterface.renameColumn('orders', 'city_id', 'cityId')
      })
      .then(() => {
        return queryInterface.renameColumn('orders', 'master_id', 'masterId')
      })
      .then(() => {
        return queryInterface.renameColumn('orders', 'clock_id', 'clockId')
      })
  }
}
