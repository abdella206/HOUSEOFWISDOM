'use strict';
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {});
  post.associate = function(models) {
    // associations can be defined here
    models.post.belongsTo(models.category)
   // models.post.belongsTo(models.user)
   // models.post.belongsToMany(models.tag, {through: "postsTags"})
    //models.post.belongsToMany(models.category, {through: 'categoriesPosts'});
    
  };
  return post;
}