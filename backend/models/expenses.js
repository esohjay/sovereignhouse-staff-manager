const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Expenses = sequelize.define("Expenses", {
  amount: DataTypes.INTEGER,
  description: DataTypes.STRING,
  receiptNo: DataTypes.STRING,
  status: DataTypes.STRING,
  image: DataTypes.STRING,
});

User.hasMany(Expenses, {
  foreignKey: "userId",
});
Expenses.belongsTo(User);

Expenses.sync().then(() => {
  console.log("Expenses table created");
});
module.exports = Expenses;
