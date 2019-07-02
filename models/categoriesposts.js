'use strict';
module.exports = (sequelize, DataTypes) => {
  const categoriesPosts = sequelize.define('categoriesPosts', {
    postId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  categoriesPosts.associate = function(models) {
    // associations can be defined here
  };
  return categoriesPosts;
};