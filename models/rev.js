'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rev extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rev.init({
    startDate: DataTypes.STRING,
    endDate: DataTypes.STRING,
    petsitter: DataTypes.STRING,
    carrer: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'rev',
  });
  return rev;
};