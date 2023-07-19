'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Users, {
        targetKey: 'userId',
        foreignKey: 'UserId',
      });

      this.belongsTo(models.Reservations, {
        targetKey: 'reservationId',
        foreignKey: 'ReservationId',
      });

      this.belongsTo(models.PetSitters, {
        targetKey: 'PetSitterId',
        foreignKey: 'petSitterId',
      });
    }
  }

  Reviews.init(
    {
      reviewId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      UserId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'userId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      ReservationId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Reservations',
          key: 'reservationId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      PetSitterId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'PetSitters',
          key: 'petSitterId',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      rating: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
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
      modelName: 'Reviews',
    }
  );
  return Reviews;
};
