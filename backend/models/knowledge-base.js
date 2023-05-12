const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const KnowledgeBase = sequelize.define("knowledgeBase", {
  name: DataTypes.STRING,
  link: DataTypes.STRING,
  group: DataTypes.STRING,
});
KnowledgeBase.sync().then(() => {
  console.log("Knowledge base table created");
});
module.exports = KnowledgeBase;
