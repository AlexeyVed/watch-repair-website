'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    email: {
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING(191),
      allowNull: false
    }
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};