"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    static associate(models) {
      // define association here
    }
  }
  News.init(
    {
      nameVi: DataTypes.STRING,
      nameEn: DataTypes.STRING,
      image: DataTypes.TEXT,
      contentHTML_Vi: DataTypes.TEXT("long"),
      contentMarkdown_Vi: DataTypes.TEXT("long"),
      contentHTML_En: DataTypes.TEXT("long"),
      contentMarkdown_En: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "News",
    }
  );
  return News;
};
