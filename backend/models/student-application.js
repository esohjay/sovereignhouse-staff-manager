const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const { sequelizeJoi, Joi } = require("sequelize-joi");
sequelizeJoi(sequelize);

const Student_Application = sequelize.define("Student_Application", {
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  full_name: {
    type: DataTypes.VIRTUAL,
    get() {
      return `${this.first_name} ${this.last_name}`;
    },
    set(value) {
      throw new Error("Do not try to set the `full_name` value!");
    },
  },
  status: DataTypes.STRING,
  address: DataTypes.STRING,
  email: DataTypes.STRING,
  status: DataTypes.STRING,
  gender: DataTypes.STRING,
  age_group: DataTypes.STRING,
  phone: DataTypes.STRING,
  emergency_contact_phone: DataTypes.STRING,
  emergency_contact_name: DataTypes.STRING,
  class: DataTypes.STRING,
  gp_surgery: DataTypes.STRING,
  learning_needs: DataTypes.STRING,
  allergies: DataTypes.STRING,
  medical_signature: DataTypes.STRING,
  family_info_signature: DataTypes.STRING,
  school: DataTypes.STRING,
  ai: DataTypes.STRING,
  sequence: DataTypes.STRING,
  selection: DataTypes.STRING,
  iteration: DataTypes.STRING,
  motions: DataTypes.STRING,
  events: DataTypes.STRING,
  variables: DataTypes.STRING,
  pyhton: DataTypes.STRING,
  hardware: DataTypes.STRING,
  e_safety: DataTypes.STRING,
  html_css: DataTypes.STRING,
  inputs_outputs: DataTypes.STRING,
  game_design: DataTypes.STRING,
  programming_constructs: DataTypes.STRING,
  consent_signature: DataTypes.STRING,
  online_safety_signature: DataTypes.STRING,
  parent_post_code: DataTypes.STRING,
  parent_name: DataTypes.STRING,
  parent_address: DataTypes.STRING,
});

Student_Application.sync().then(() => {
  console.log("Student_Application table created");
});
module.exports = Student_Application;
