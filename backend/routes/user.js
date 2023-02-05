const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createUser,
  updateUser,
  getAllUsers,
  getUser,
  deleteUser,
  login,
} = require("../controllers/user");
const { verifyUser } = require("../middlewares/auth");

const router = express.Router();
router.post("/", verifyUser, catchAsync(createUser));
router.post("/login", verifyUser, catchAsync(login));
router.put("/:id", verifyUser, catchAsync(updateUser));
router.get("/", verifyUser, catchAsync(getAllUsers));
router.get("/:id", verifyUser, catchAsync(getUser));
router.delete("/:id", verifyUser, catchAsync(deleteUser));

module.exports = router;
