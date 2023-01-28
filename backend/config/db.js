const Sequelize = require("sequelize");
require("dotenv").config();

module.exports = new Sequelize("volunteer_manager", "root", "", {
  host: "localhost",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
