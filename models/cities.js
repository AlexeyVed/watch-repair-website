'use strict';
module.exports = (sequelize, DataTypes) => {
  const cities = sequelize.define('cities', {
    city: {
      type: DataTypes.STRING(191),
      allowNull: false
    }
  }, {});
  cities.associate = function(models) {
    cities.hasMany(models.masters)
    cities.hasMany(models.orders)
  };
  return cities;
};