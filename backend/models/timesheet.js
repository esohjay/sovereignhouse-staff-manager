const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const Shift = require("./shift");

const TimeSheet = sequelize.define("timesheet", {
  startTime: DataTypes.DATE,
  endTime: DataTypes.DATE,
});

Shift.hasMany(TimeSheet, {
  foreignKey: "shiftId",
});
TimeSheet.belongsTo(Shift);
User.hasMany(TimeSheet, {
  foreignKey: "userId",
});
TimeSheet.belongsTo(User);

TimeSheet.sync().then(() => {
  console.log("timesheet table created");
});
module.exports = TimeSheet;
