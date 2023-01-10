"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Booking.belongsTo(models.Customer, {
        foreignKey: "customerId",
        targetKey: "id",
        as: "customerData",
      });
      Booking.belongsTo(models.Allcode, {
        foreignKey: "timeType",
        targetKey: "keyMap",
        as: "timeBookingData",
      });
      Booking.belongsTo(models.Allcode, {
        foreignKey: "priceType",
        targetKey: "keyMap",
        as: "priceBookingData",
      });
      Booking.belongsTo(models.Allcode, {
        foreignKey: "statusId",
        targetKey: "keyMap",
        as: "statusData",
      });
      Booking.belongsTo(models.Movie, {
        foreignKey: "movieId",
        targetKey: "id",
        as: "movieBookingData",
      });
      Booking.belongsTo(models.Cinema, {
        foreignKey: "cinemaId",
        targetKey: "id",
        as: "cinemaBookingData",
      });
    }
  }
  Booking.init(
    {
      statusId: DataTypes.STRING,
      cinemaId: DataTypes.INTEGER,
      movieId: DataTypes.INTEGER,
      customerId: DataTypes.INTEGER,
      priceType: DataTypes.STRING,
      ticketNumber: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Booking",
    }
  );
  return Booking;
};
