const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Applicant = require("./applicant");

const Campaign = sequelize.define("Campaign", {
  numberOfCandidates: DataTypes.INTEGER,
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  position: DataTypes.STRING,
  workplace: DataTypes.STRING,
  contractType: DataTypes.STRING,
  startDate: DataTypes.DATE,
  endDate: DataTypes.DATE,
  status: DataTypes.STRING,
});

Campaign.hasMany(Applicant);
Applicant.belongsTo(Campaign);

sequelize.sync().then(() => {
  console.log("Campaign and apllicant table created");
});
module.exports = Campaign;
