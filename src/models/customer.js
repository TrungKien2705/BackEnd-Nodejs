"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Customer.hasMany(models.Booking, {
        foreignKey: "customerId",
        as: "customerData",
      });
      Customer.belongsTo(models.Allcode, {
        foreignKey: "gender",
        targetKey: "keyMap",
        as: "genderCustData",
      });
    }
  }
  Customer.init(
    {
      email: DataTypes.STRING,
      fullName: DataTypes.STRING,
      address: DataTypes.STRING(100),
      gender: DataTypes.STRING(100),
      birthday: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      deletect: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Customer",
    }
  );
  return Customer;
};
