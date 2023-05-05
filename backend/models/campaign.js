const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Applicant = require("./applicant");

const Campaign = sequelize.define("Campaign", {
  numberOfCandidates: DataTypes.INTEGER,
  department: DataTypes.STRING,
  description: DataTypes.TEXT("medium"),
  position: DataTypes.STRING,
  workplace: DataTypes.STRING,
  contractType: DataTypes.STRING,
  startDate: DataTypes.DATE,
  skillRequired: DataTypes.TEXT,
  benefits: DataTypes.TEXT,
  endDate: DataTypes.DATE,
  status: DataTypes.STRING,
});

Campaign.hasMany(Applicant);
Applicant.belongsTo(Campaign);

sequelize.sync().then(() => {
  console.log("Campaign and apllicant table created");
});
module.exports = Campaign;
