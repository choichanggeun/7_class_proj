"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reservations", {
      reservationId: {
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
      startDate: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      endDate: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      petSitter: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      career: {
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
    await queryInterface.dropTable("Reservations");
  },
};
