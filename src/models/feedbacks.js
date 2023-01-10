"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Feedbacks extends Model {
    static associate(models) {
      // define association here
    }
  }
  Feedbacks.init(
    {
      customerId: DataTypes.INTEGER,
      content: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "Feedbacks",
    }
  );
  return Feedbacks;
};
