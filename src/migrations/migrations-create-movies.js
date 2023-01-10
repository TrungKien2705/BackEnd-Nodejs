"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("movies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nameVi: {
        type: Sequelize.STRING,
      },
      nameEn: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.BLOB("long"),
      },
      cinemaId: {
        type: Sequelize.INTEGER,
      },
      director: {
        type: Sequelize.STRING,
      },
      priceId: {
        type: Sequelize.STRING,
      },
      categoryId: {
        type: Sequelize.STRING,
      },
      timeType: {
        type: Sequelize.STRING,
      },
      countryType: {
        type: Sequelize.STRING,
      },
      premiere_date: {
        type: Sequelize.STRING,
      },
      trailer: {
        type: Sequelize.TEXT,
      },
      descriptionVi: {
        type: Sequelize.TEXT,
      },
      descriptionEn: {
        type: Sequelize.TEXT,
      },
      deletect: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
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
    await queryInterface.dropTable("movies");
  },
};
