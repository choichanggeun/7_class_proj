'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class petInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  petInfo.init({
    petName: DataTypes.STRING,
    petGender: DataTypes.STRING,
    petAge: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'petInfo',
  });
  return petInfo;
};