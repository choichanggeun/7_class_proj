"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reservations extends Model {
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

      this.belongsTo(models.PetInfos, {
        targetKey: "petInfoId",
        foreignKey: "PetInfoId",
      });

      this.hasMany(models.Reviews, {
        sourceKey: "reservationId",
        foreignKey: "ReservationId",
      });
    }
  }

  Reservations.init(
    {
      reservationId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "userId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      PetInfoId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "PetInfos",
          key: "petInfoId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      startDate: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      endDate: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      petSitter: {
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
      modelName: "Reservations",
    }
  );
  return Reservations;
};
