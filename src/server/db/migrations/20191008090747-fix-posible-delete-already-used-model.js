'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('masters', 'city_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    })
      .then(() => {
        return queryInterface.changeColumn('orders', 'city_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        })
      })
      .then(() => {
        return queryInterface.changeColumn('orders', 'customer_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        })
      })
      .then(() => {
        return queryInterface.changeColumn('orders', 'clock_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        })
      })
      .then(() => {
        return queryInterface.changeColumn('orders', 'master_id', {
          type: Sequelize.INTEGER,
          allowNull: false,
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT'
        })
      })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('masters', 'cidy_id', {
      type: Sequelize.INTEGER,
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    })
      .then(() => {
        return queryInterface.changeColumn('orders', 'city_id', {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        })
      })
      .then(() => {
        return queryInterface.changeColumn('orders', 'customer_id', {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        })
      })
      .then(() => {
        return queryInterface.changeColumn('orders', 'clock_id', {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        })
      })
      .then(() => {
        return queryInterface.changeColumn('orders', 'master_id', {
          type: Sequelize.INTEGER,
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL'
        })
      })
  }
}
