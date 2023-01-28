const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("user", {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  status: DataTypes.STRING,
  email: DataTypes.STRING,
  address: DataTypes.STRING,
  phone: DataTypes.STRING,
  contractType: DataTypes.STRING,
});

User.sync().then(() => {
  console.log("table created");
});
module.exports = User;
