const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createLeave,
  updateLeave,
  getAllLeaves,
  getLeave,
  deleteLeave,
} = require("../controllers/leave");
const { verifyAdmin, verifyUser } = require("../middlewares/auth");

const router = express.Router();
router.post("/", verifyUser, catchAsync(createLeave));
router.put("/:id", verifyUser, catchAsync(updateLeave));
router.get("/", verifyAdmin, catchAsync(getAllLeaves));
router.get("/:id", verifyUser, catchAsync(getLeave));
router.delete("/:id", verifyUser, catchAsync(deleteLeave));

module.exports = router;
