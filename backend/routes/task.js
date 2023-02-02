const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createTask,
  updateTask,
  getAllTasks,
  getTask,
  deleteTask,
  assignStaff,
} = require("../controllers/task");

const router = express.Router();
router.post("/", catchAsync(createTask));
router.put("/:id", catchAsync(updateTask));
router.put("/", catchAsync(assignStaff));
router.get("/", catchAsync(getAllTasks));
router.get("/:id", catchAsync(getTask));
router.delete("/:id", catchAsync(deleteTask));

module.exports = router;
