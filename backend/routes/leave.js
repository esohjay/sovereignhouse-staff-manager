const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createLeave,
  updateLeave,
  getAllLeaves,
  getLeave,
  deleteLeave,
} = require("../controllers/leave");
const { verifyAdmin } = require("../middlewares/auth");

const router = express.Router();
router.post("/", catchAsync(createLeave));
router.put("/:id", verifyAdmin, catchAsync(updateLeave));
router.get("/", verifyAdmin, catchAsync(getAllLeaves));
router.get("/:id", verifyAdmin, catchAsync(getLeave));
router.delete("/:id", verifyAdmin, catchAsync(deleteLeave));

module.exports = router;
