const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createTimesheet,
  updateTimesheet,
  getAllTimesheets,
  getTimesheet,
  deleteTimesheet,
  getUserTimesheets,
} = require("../controllers/timesheet");
const { verifyUser, verifyAdmin } = require("../middlewares/auth");

const router = express.Router();
router.post("/", verifyUser, catchAsync(createTimesheet));
router.put("/:id", verifyUser, catchAsync(updateTimesheet));
router.get("/", verifyUser, catchAsync(getAllTimesheets));
router.get("/:id", verifyUser, catchAsync(getTimesheet));
router.get("/user/:id", verifyUser, catchAsync(getUserTimesheets));
router.delete("/:id", verifyAdmin, catchAsync(deleteTimesheet));

module.exports = router;
