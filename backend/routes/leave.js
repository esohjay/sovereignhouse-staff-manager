const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createLeave,
  updateLeave,
  getAllLeaves,
  getLeave,
  deleteLeave,
  getUserLeave,
  addLeaveAdmin,
} = require("../controllers/leave");
const { verifyAdmin, verifyUser } = require("../middlewares/auth");

const router = express.Router();
router.post("/", verifyUser, catchAsync(createLeave));
router.put("/:id", verifyUser, catchAsync(updateLeave));
router.get("/", verifyAdmin, catchAsync(getAllLeaves));
router.post("/add-leave-admin", verifyAdmin, catchAsync(addLeaveAdmin));
router.get("/:id", verifyUser, catchAsync(getLeave));
router.get("/:id/user-leave-request", verifyUser, catchAsync(getUserLeave));
router.delete("/:id", verifyUser, catchAsync(deleteLeave));

module.exports = router;
