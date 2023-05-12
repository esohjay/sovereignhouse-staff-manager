const Sequelize = require("sequelize");

module.exports = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PW,
  {
    host: process.env.HOST,
    dialect: "mysql",
    //  dialectOptions: { ssl: {} },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

// const Sequelize = require("sequelize");

// module.exports = new Sequelize(
//   "sovejksr_volunteer_manager",
//   "sovejksr_olusoji",
//   "tOAw0ADVJNus",
//   {
//     host: "127.0.0.1",
//     dialect: "mysql",

//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   }
// );
// py6rejkfeqsbb4z9k9i9
// pscale_pw_DjU0fa4UMdaLTvxU8RkUmnk7Joq8rN7wMNs3wNrz33I
// aws.connect.psdb.cloud
