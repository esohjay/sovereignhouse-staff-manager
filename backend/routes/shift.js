const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createShift,
  updateShift,
  getAllShifts,
  getShift,
  deleteShift,
  assignStaff,
  unAssignStaff,
} = require("../controllers/shift");
const { verifyUser, verifyAdmin } = require("../middlewares/auth");

const router = express.Router();
router.post("/", verifyAdmin, catchAsync(createShift));
router.put("/:id", verifyAdmin, catchAsync(updateShift));
router.put("/", verifyAdmin, catchAsync(assignStaff));
router.put("/:id/unassign", verifyAdmin, catchAsync(unAssignStaff));
router.get("/", verifyUser, catchAsync(getAllShifts));
router.get("/:id", verifyUser, catchAsync(getShift));
router.delete("/:id", verifyAdmin, catchAsync(deleteShift));

module.exports = router;
