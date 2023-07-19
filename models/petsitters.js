'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PetSitters extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.hasMany(models.Reviews, {
        sourceKey: 'petSitterId',
        foreignKey: 'PetSitterId',
      });
    }
  }

  PetSitters.init(
    {
      petSitterId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      sitterName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      career: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: 'PetSitters',
    }
  );
  return PetSitters;
};
