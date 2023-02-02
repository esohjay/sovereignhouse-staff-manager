const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user");
const UserTasks = require("./userTask");

const Task = sequelize.define("task", {
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  startDate: DataTypes.STRING,
  dueDate: DataTypes.STRING,
  // assignedBy: DataTypes.STRING,
  status: DataTypes.STRING,
  priority: DataTypes.STRING,
});

Task.belongsToMany(User, { as: "asignees", through: UserTasks });
User.belongsToMany(Task, { as: "tasks", through: UserTasks });

User.hasMany(Task);
Task.belongsTo(User, { as: "asignedBy", foreignKey: "taskCreatorId" });
User.hasMany(UserTasks);
UserTasks.belongsTo(User);
Task.hasMany(UserTasks);
UserTasks.belongsTo(Task);

sequelize.sync().then(() => {
  console.log("Task table created");
});
module.exports = Task;
