const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { sequelizeJoi, Joi } = require("sequelize-joi");
sequelizeJoi(sequelize);

const User = sequelize.define("user", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
    unique: true,
    schema: Joi.string().trim().required(),
  },
  firstName: { type: DataTypes.STRING, schema: Joi.string().trim().required() },
  lastName: { type: DataTypes.STRING, schema: Joi.string().trim().required() },
  fullName: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    set(value) {
      throw new Error("Do not try to set the `fullName` value!");
    },
  },
  status: { type: DataTypes.STRING, schema: Joi.string().trim().required() },
  email: {
    type: DataTypes.STRING,
    // schema: Joi.string().trim().required().email(),
  },
  address: { type: DataTypes.STRING, schema: Joi.string().trim().required() },
  phone: { type: DataTypes.STRING, schema: Joi.string().trim().required() },
  contractType: {
    type: DataTypes.STRING,
    schema: Joi.string().trim().required(),
  },
});

User.sync().then(() => {
  console.log("user table created");
});
module.exports = User;
