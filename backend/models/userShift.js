const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Shift = require("./shift");
const UserShifts = sequelize.define("UserShifts", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

module.exports = UserShifts;
