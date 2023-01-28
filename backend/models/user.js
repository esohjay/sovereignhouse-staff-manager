const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { sequelizeJoi, Joi } = require("sequelize-joi");
sequelizeJoi(sequelize);

const User = sequelize.define("user", {
  firstName: { type: DataTypes.STRING, schema: Joi.string().trim().required() },
  lastName: { type: DataTypes.STRING, schema: Joi.string().trim().required() },
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
