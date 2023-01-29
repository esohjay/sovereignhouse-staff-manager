const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const UserShifts = require("./userShift");

const Shift = sequelize.define("shift", {
  title: DataTypes.STRING,
  studentCategory: DataTypes.STRING,
  startTime: DataTypes.STRING,
  endTime: DataTypes.STRING,
  venue: DataTypes.STRING,
  description: DataTypes.STRING,
});

Shift.belongsToMany(User, { as: "users", through: UserShifts });
User.belongsToMany(Shift, { as: "shifts", through: UserShifts });

User.hasMany(UserShifts);
UserShifts.belongsTo(User);
Shift.hasMany(UserShifts);
UserShifts.belongsTo(Shift);

sequelize.sync().then(() => {
  console.log("shift table created");
});
module.exports = Shift;
