'use strict';
module.exports = (sequelize, DataTypes) => {
  const clocks = sequelize.define('clocks', {
    typeClock: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    timeRepair: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  clocks.associate = function(models) {
    clocks.hasMany(models.orders)
  };
  return clocks;
};