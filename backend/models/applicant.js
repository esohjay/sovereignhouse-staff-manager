const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { sequelizeJoi, Joi } = require("sequelize-joi");
sequelizeJoi(sequelize);

const Applicant = sequelize.define("Applicant", {
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
  address: { type: DataTypes.STRING, schema: Joi.string().trim().required() },
  email: {
    type: DataTypes.STRING,
    // schema: Joi.string().trim().required().email(),
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "pending",
    schema: Joi.string().trim().required(),
  },
  gender: { type: DataTypes.STRING, schema: Joi.string().trim().required() },
  phone: { type: DataTypes.STRING, schema: Joi.string().required() },
  fileSrc: { type: DataTypes.STRING, schema: Joi.string().required() },
});

// Applicant.sync().then(() => {
//   console.log("Applicant table created");
// });
module.exports = Applicant;
