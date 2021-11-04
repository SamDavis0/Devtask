'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class memberships extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.users.belongsTo(models.memberships, {foreignKey: 'user_id'})
      models.projects.belongsTo(models.memberships, {foreignKey: 'project_id'})
    }
  };
  memberships.init({
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'memberships',
  });
  return memberships;
};