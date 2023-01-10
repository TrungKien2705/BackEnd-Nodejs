"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cinema extends Model {
    static associate(models) {
      // define association here
      Cinema.hasMany(models.Movie, {
        foreignKey: "cinemaId",
        as: "cinemaData",
      });
      Cinema.hasMany(models.Booking, {
        foreignKey: "cinemaId",
        as: "cinemaBookingData",
      });
    }
  }
  Cinema.init(
    {
      nameVi: DataTypes.STRING,
      nameEn: DataTypes.STRING,
      addressVi: DataTypes.STRING,
      addressEn: DataTypes.STRING,
      hotline: DataTypes.STRING,
      image: DataTypes.BLOB("long"),
      descriptionMarkdown_Vi: DataTypes.TEXT,
      descriptionHTML_Vi: DataTypes.TEXT,
      descriptionMarkdown_En: DataTypes.TEXT,
      descriptionHTML_En: DataTypes.TEXT,
      deletect: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cinema",
    }
  );
  return Cinema;
};
