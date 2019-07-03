'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  category.associate = function(models) {
    // associations can be defined here
    models.category.belongsTo(models.user)
    models.category.hasMany(models.post)
  };
  return category;
};