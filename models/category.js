'use strict';
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING
  }, {});
  category.associate = function(models) {
    // associations can be defined here
    models.category.hasMany(models.post)
    models.category.belongsToMany(models.post, {through: 'categoriesPosts'});
  };
  return category;
};