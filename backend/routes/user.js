const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createUser,
  updateUser,
  getAllUsers,
  getUser,
  deleteUser,
} = require("../controllers/user");

const router = express.Router();
router.post("/", catchAsync(createUser));
router.put("/:id", catchAsync(updateUser));
router.get("/", catchAsync(getAllUsers));
router.get("/:id", catchAsync(getUser));
router.delete("/:id", catchAsync(deleteUser));

module.exports = router;
