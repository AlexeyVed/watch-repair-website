'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'masters',
      'cityId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'cities',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
      .then(() => {
        return queryInterface.addColumn(
          'orders',
          'customerId',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'customers',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          }
        )
      })
      .then(() => {
        return queryInterface.addColumn(
          'orders',
          'clockId',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'clocks',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          }
        )
      })
      .then(() => {
        return queryInterface.addColumn(
          'orders',
          'cityId',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'cities',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          }
        )
      })
      .then(() => {
        return queryInterface.addColumn(
          'orders',
          'masterId',
          {
            type: Sequelize.INTEGER,
            references: {
              model: 'masters',
              key: 'id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL'
          }
        )
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'masters',
      'cityId'
    )
      .then(() => {
        return queryInterface.removeColumn(
          'orders',
          'customerId'
        )
      })
      .then(() => {
        return queryInterface.removeColumn(
          'orders',
          'clockId'
        )
      })
      .then(() => {
        return queryInterface.removeColumn(
          'orders',
          'cityId'
        )
      })
      .then(() => {
        return queryInterface.removeColumn(
          'orders',
          'masterId'
        )
      })
  }
}
