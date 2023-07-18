"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PetInfos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Users, {
        targetKey: "userId",
        foreignKey: "UserId",
      });

      this.hasMany(models.Reservations, {
        sourceKey: "petInfoId",
        foreignKey: "PetInfoId",
      });
    }
  }
  PetInfos.init(
    {
      petInfoId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },

      petName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      petGender: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      petAge: {
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
      modelName: "PetInfos",
    }
  );
  return PetInfos;
};
