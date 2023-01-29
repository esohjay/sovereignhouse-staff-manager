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
// User.hasMany(UserShifts, {
//   foreignKey: "userId",
// });
// UserShifts.belongsTo(User);
// Shift.hasMany(UserShifts, {
//   foreignKey: "shiftId",
// });
// UserShifts.belongsTo(Shift);

// UserShifts.sync().then(() => {
//   console.log("usershift table created");
// });
module.exports = UserShifts;
