"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reviews", {
      reviewId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "userId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      ReservationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Reservations",
          key: "reservationId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      PetInfoId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "PetInfos",
          key: "petInfoId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      rating: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Reviews");
  },
};
