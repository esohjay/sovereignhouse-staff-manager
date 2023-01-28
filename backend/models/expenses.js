const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Expenses = sequelize.define("Expenses", {
  title: DataTypes.STRING,
  stundentCategory: DataTypes.STRING,
  startTime: DataTypes.STRING,
  endTime: DataTypes.STRING,
  venue: DataTypes.STRING,
  description: DataTypes.STRING,
});

User.hasMany(Expenses, {
  foreignKey: "userId",
});
Expenses.belongsTo(User);

Expenses.sync().then(() => {
  console.log("Expenses table created");
});
module.exports = Expenses;
