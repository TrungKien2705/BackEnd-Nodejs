"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employee.belongsTo(models.Allcode, {
        foreignKey: "roleId",
        targetKey: "keyMap",
        as: "roleData",
      });
      Employee.belongsTo(models.Allcode, {
        foreignKey: "address",
        targetKey: "keyMap",
        as: "addressData",
      });
      Employee.belongsTo(models.Allcode, {
        foreignKey: "gender",
        targetKey: "keyMap",
        as: "genderData",
      });
    }
  }
  Employee.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      address: DataTypes.STRING(100),
      gender: DataTypes.STRING(100),
      roleId: DataTypes.STRING(100),
      birthday: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      image: DataTypes.STRING,
      token: DataTypes.STRING,
      deletect: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Employee",
    }
  );
  return Employee;
};
