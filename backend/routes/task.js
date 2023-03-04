const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createTask,
  updateTask,
  getAllTasks,
  getTask,
  deleteTask,
  assignStaff,
  getUserTasks,
} = require("../controllers/task");
const { verifyUser, verifyAdmin } = require("../middlewares/auth");

const router = express.Router();
router.post("/", verifyUser, catchAsync(createTask));
router.put("/:id", catchAsync(updateTask));
router.put("/", verifyUser, catchAsync(assignStaff));
router.get("/", catchAsync(getAllTasks));
router.get("/:id", catchAsync(getTask));
router.get("/user/:id", verifyUser, catchAsync(getUserTasks));
router.delete("/:id", catchAsync(deleteTask));

module.exports = router;
