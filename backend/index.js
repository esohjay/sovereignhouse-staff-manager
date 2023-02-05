const express = require("express");
require("dotenv").config();
const ExpressError = require("./middlewares/ExpressError");
const db = require("./config/db");
const cors = require("cors");

//routes
const userRoute = require("./routes/user");
const shiftRoute = require("./routes/shift");
const timesheetRoute = require("./routes/timesheet");
const taskRoute = require("./routes/task");
const expensesRoute = require("./routes/expenses");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//db connection
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

app.get("/", (req, res) => {
  res.send("welcome to soverignhouse");
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/shift", shiftRoute);
app.use("/api/v1/timesheet", timesheetRoute);
app.use("/api/v1/task", taskRoute);
app.use("/api/v1/expenses", expensesRoute);
app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).send(err.message);
});
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Serving on port ${port}`);
});
