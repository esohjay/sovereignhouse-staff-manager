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
  status: { type: DataTypes.STRING, schema: Joi.string().trim().required() },
  email: {
    type: DataTypes.STRING,
    // schema: Joi.string().trim().required().email(),
  },
  address: { type: DataTypes.STRING, schema: Joi.string().trim().required() },
  gender: { type: DataTypes.STRING, schema: Joi.string().trim().required() },
  phone: { type: DataTypes.INTEGER, schema: Joi.number().required() },
});

// Applicant.sync().then(() => {
//   console.log("Applicant table created");
// });
module.exports = Applicant;
