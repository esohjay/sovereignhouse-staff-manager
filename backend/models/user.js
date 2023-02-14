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
  religion: { type: DataTypes.STRING, schema: Joi.string().trim().required() },
  jobPosition: {
    type: DataTypes.STRING,
    schema: Joi.string().trim().required(),
  },
  placeOfBirth: {
    type: DataTypes.STRING,
    schema: Joi.string().trim().required(),
  },
  nationality: {
    type: DataTypes.STRING,
    schema: Joi.string().trim().required(),
  },
  gender: { type: DataTypes.STRING, schema: Joi.string().trim().required() },
  maritalStatus: {
    type: DataTypes.STRING,
    schema: Joi.string().trim().required(),
  },
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    schema: Joi.string().trim().required(),
  },
  phone: { type: DataTypes.INTEGER, schema: Joi.number().required() },
  contractType: {
    type: DataTypes.STRING,
    schema: Joi.string().trim().required(),
  },
  isDefaultPassword: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
});

User.sync().then(() => {
  console.log("user table created");
});
module.exports = User;
