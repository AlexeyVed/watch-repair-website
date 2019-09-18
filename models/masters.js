'use strict';
module.exports = (sequelize, DataTypes) => {
  const masters = sequelize.define('masters', {
    name: {
      type: DataTypes.STRING(191),
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  masters.associate = function(models) {
    masters.belongsTo(models.cities)
    masters.hasMany(models.orders)
  };
  return masters;
};