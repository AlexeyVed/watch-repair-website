'use strict';
module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define('orders', {
    date: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    time: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  orders.associate = function(models) {
    orders.belongsTo(models.customers)
    orders.belongsTo(models.clocks)
    orders.belongsTo(models.cities)
    orders.belongsTo(models.masters)
  };
  return orders;
};