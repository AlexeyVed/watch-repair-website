'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('masters', ['city_id'], {
      type: 'foreign key',
      name: 'masters_city_id_foreign_idx',
      allowNull: false,
      references: {
        table: 'cities',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    })
      .then(() => {
        return queryInterface.addConstraint('orders', ['city_id'], {
          type: 'foreign key',
          name: 'orders_city_id_foreign_idx',
          allowNull: false,
          references: {
            table: 'cities',
            field: 'id'
          },
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        })
      })
      .then(() => {
        return queryInterface.addConstraint('orders', ['customer_id'], {
          type: 'foreign key',
          name: 'orders_customer_id_foreign_idx',
          allowNull: false,
          references: {
            table: 'customers',
            field: 'id'
          },
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        })
      })
      .then(() => {
        return queryInterface.addConstraint('orders', ['clock_id'], {
          type: 'foreign key',
          name: 'orders_clock_id_foreign_idx',
          allowNull: false,
          references: {
            table: 'clocks',
            field: 'id'
          },
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        })
      })
      .then(() => {
        return queryInterface.addConstraint('orders', ['master_id'], {
          type: 'foreign key',
          name: 'orders_master_id_foreign_idx',
          allowNull: false,
          references: {
            table: 'masters',
            field: 'id'
          },
          onDelete: 'RESTRICT',
          onUpdate: 'CASCADE'
        })
      })
  }
}
