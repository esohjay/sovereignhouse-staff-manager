const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Leave = sequelize.define("leave", {
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
  reason: DataTypes.STRING,
  title: DataTypes.STRING,
  statusMessage: DataTypes.STRING,
  type: DataTypes.STRING,
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Pending",
  },
});
module.exports = Leave;
