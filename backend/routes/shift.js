const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createShift,
  updateShift,
  getAllShifts,
  getShift,
  deleteShift,
  assignStaff,
} = require("../controllers/shift");

const router = express.Router();
router.post("/", catchAsync(createShift));
router.put("/:id", catchAsync(updateShift));
router.put("/", catchAsync(assignStaff));
router.get("/", catchAsync(getAllShifts));
router.get("/:id", catchAsync(getShift));
router.delete("/:id", catchAsync(deleteShift));

module.exports = router;
