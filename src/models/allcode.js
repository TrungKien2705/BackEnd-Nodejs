"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      //employee
      Allcode.hasMany(models.Employee, {
        foreignKey: "roleId",
        as: "roleData",
      });
      Allcode.hasMany(models.Employee, {
        foreignKey: "gender",
        as: "genderData",
      });
      Allcode.hasMany(models.Employee, {
        foreignKey: "address",
        as: "addressData",
      });
      // movie
      Allcode.hasMany(models.Movie, {
        foreignKey: "priceId",
        as: "priceData",
      });
      Allcode.hasMany(models.Movie, {
        foreignKey: "countryType",
        as: "countryData",
      });
      Allcode.hasMany(models.Movie, {
        foreignKey: "categoryId",
        as: "cateData",
      });
      Allcode.hasMany(models.Movie_allcode, {
        foreignKey: "allcodeId",
        as: "cateDataAll",
      });
      Allcode.hasMany(models.Schedule, {
        foreignKey: "timeType",
        as: "timeData",
      });
      Allcode.hasMany(models.Booking, {
        foreignKey: "timeType",
        as: "timeBookingData",
      });
      Allcode.hasMany(models.Booking, {
        foreignKey: "priceType",
        as: "priceBookingData",
      });
      Allcode.hasMany(models.Booking, {
        foreignKey: "statusId",
        as: "statusData",
      });
      Allcode.hasMany(models.Customer, {
        foreignKey: "gender",
        as: "genderCustData",
      });
    }
  }
  Allcode.init(
    {
      keyMap: DataTypes.STRING,
      type: DataTypes.STRING,
      valueEn: DataTypes.STRING,
      valueVi: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcode",
    }
  );
  return Allcode;
};
