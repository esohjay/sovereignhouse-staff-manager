const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const UserTasks = require("./userTask");

const Task = sequelize.define("task", {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  startDate: DataTypes.STRING,
  dueDate: DataTypes.STRING,
  // asignedBy: DataTypes.STRING,
  status: DataTypes.STRING,
  priority: DataTypes.STRING,
});

User.hasMany(Task, { as: "creator" });
Task.belongsTo(User);

Task.belongsToMany(User, { as: "asignees", through: UserTasks });
User.belongsToMany(Task, { as: "tasks", through: UserTasks });

User.hasMany(UserTasks);
UserTasks.belongsTo(User);
Task.hasMany(UserTasks);
UserTasks.belongsTo(Task);

sequelize.sync().then(() => {
  console.log("Task table created");
});
module.exports = Task;
