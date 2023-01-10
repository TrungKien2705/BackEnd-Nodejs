"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cinemas", {
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
      addressVi: {
        type: Sequelize.STRING,
      },
      addressEn: {
        type: Sequelize.STRING,
      },
      hotline: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.BLOB("long"),
      },
      descriptionMarkdown_Vi: {
        type: Sequelize.TEXT,
      },
      descriptionHTML_Vi: {
        type: Sequelize.TEXT,
      },
      descriptionMarkdown_EN: {
        type: Sequelize.TEXT,
      },
      descriptionHTML_En: {
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
    await queryInterface.dropTable("cinemas");
  },
};
