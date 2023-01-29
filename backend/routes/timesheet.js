const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createTimesheet,
  updateTimesheet,
  getAllTimesheets,
  getTimesheet,
  deleteTimesheet,
} = require("../controllers/timesheet");

const router = express.Router();
router.post("/", catchAsync(createTimesheet));
router.put("/:id", catchAsync(updateTimesheet));
router.get("/", catchAsync(getAllTimesheets));
router.get("/:id", catchAsync(getTimesheet));
router.delete("/:id", catchAsync(deleteTimesheet));

module.exports = router;
