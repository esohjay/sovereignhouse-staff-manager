const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Shift = sequelize.define("shift", {
  title: DataTypes.STRING,
  stundentCategory: DataTypes.STRING,
  startTime: DataTypes.STRING,
  endTime: DataTypes.STRING,
  venue: DataTypes.STRING,
  description: DataTypes.STRING,
});

Shift.belongsToMany(User, { through: "UserShifts" });
User.belongsToMany(Shift, { through: "UserShifts" });

Shift.sync().then(() => {
  console.log("shift table created");
});
module.exports = Shift;
