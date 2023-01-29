const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const UserTasks = sequelize.define("UserTasks", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
});

module.exports = UserTasks;
