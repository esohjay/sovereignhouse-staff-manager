const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");

const Task = sequelize.define("task", {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  startDate: DataTypes.STRING,
  dueDate: DataTypes.STRING,
  assignedBy: DataTypes.STRING,
  status: DataTypes.STRING,
  priority: DataTypes.STRING,
});

Task.belongsToMany(User, { through: "UserTasks" });
User.belongsToMany(Task, { through: "UserTasks" });

Task.sync().then(() => {
  console.log("Task table created");
});
module.exports = Task;
