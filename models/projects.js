'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.projects.hasMany(models.memberships, {foreignKey: 'project_id'})
      models.tasks.belongsTo(models.projects, {foreignKey: 'project_id'})
    }
  };
  projects.init({
    project_name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'projects',
  });
  return projects;
};