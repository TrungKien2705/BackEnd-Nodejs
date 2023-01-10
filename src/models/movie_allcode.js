"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie_allcode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie_allcode.belongsTo(models.Allcode, {
        foreignKey: "allcodeId",
        targetKey: "id",
        as: "cateDataAll",
      });
    }
  }
  Movie_allcode.init(
    {
      movieId: DataTypes.INTEGER,
      allcodeId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Movie_allcode",
    }
  );
  return Movie_allcode;
};
