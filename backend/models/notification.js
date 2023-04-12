const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Notification = sequelize.define("notification", {
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  path: DataTypes.STRING,
  viewed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});
module.exports = Notification;
