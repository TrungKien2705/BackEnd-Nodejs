"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Schedule extends Model {
    static associate(models) {
      // define association here
      Schedule.belongsTo(models.Allcode, {
        foreignKey: "timeType",
        targetKey: "keyMap",
        as: "timeData",
      });
      Schedule.belongsTo(models.Movie, {
        foreignKey: "movieId",
        targetKey: "id",
        as: "movieData",
      });

      //   Schedule.belongsTo(models.User, {
      //     foreignKey: "doctorId",
      //     targetKey: "id",
      //     as: "doctorData",
      //   });
    }
  }
  Schedule.init(
    {
      maxNumber: DataTypes.INTEGER,
      date: DataTypes.STRING,
      timeType: DataTypes.STRING,
      movieId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Schedule",
    }
  );
  return Schedule;
};
