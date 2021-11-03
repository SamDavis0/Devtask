'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class membership extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.users.belongsTo(models.membership, {foreignKey: 'user_id'})
      models.projects.belongsTo(models.membership, {foreignKey: 'project_id'})
    }
  };
  membership.init({
    user_id: DataTypes.INTEGER,
    project_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'membership',
  });
  return membership;
};