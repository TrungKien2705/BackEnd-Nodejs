"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      // define association here
      Movie.belongsTo(models.Allcode, {
        foreignKey: "priceId",
        targetKey: "keyMap",
        as: "priceData",
      });
      Movie.belongsTo(models.Allcode, {
        foreignKey: "countryType",
        targetKey: "keyMap",
        as: "countryData",
      });
      Movie.belongsTo(models.Allcode, {
        foreignKey: "categoryId",
        targetKey: "keyMap",
        as: "cateData",
      });
      Movie.belongsTo(models.Cinema, {
        foreignKey: "cinemaId",
        targetKey: "id",
        as: "cinemaData",
      });
      Movie.hasMany(models.Schedule, {
        foreignKey: "movieId",
        as: "movieData",
      });
      Movie.hasMany(models.Booking, {
        foreignKey: "movieId",
        as: "movieBookingData",
      });
    }
  }
  Movie.init(
    {
      nameVi: DataTypes.STRING,
      nameEn: DataTypes.STRING,
      image: DataTypes.TEXT,
      cinemaId: DataTypes.INTEGER,
      director: DataTypes.STRING(100), //dao dien
      priceId: DataTypes.STRING, //gia ve
      categoryId: DataTypes.STRING, //the loai
      timeType: DataTypes.STRING, //thời lượng
      countryType: DataTypes.STRING, //quốc gia
      premiere_date: DataTypes.STRING, //khoi chieu
      trailer: DataTypes.TEXT,
      descriptionVi: DataTypes.TEXT,
      descriptionEn: DataTypes.TEXT,
      deletect: DataTypes.INTEGER,
      bookingTick: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
