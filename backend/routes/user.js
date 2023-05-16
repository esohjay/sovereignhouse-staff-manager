const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createUser,
  updateUser,
  getAllUsers,
  getUser,
  deleteUser,
  login,
  makeAdmin,
  resetPassword,
  changeStatus,
} = require("../controllers/user");
const { verifyUser, verifyAdmin } = require("../middlewares/auth");

const router = express.Router();
router.post("/", verifyAdmin, catchAsync(createUser));
// make user admin
router.post("/make-admin", verifyUser, catchAsync(makeAdmin));
router.post("/login", verifyUser, catchAsync(login));
router.put("/:id", verifyUser, catchAsync(updateUser));
router.post("/reset-password", verifyAdmin, catchAsync(resetPassword));
router.put("/:id/change-status", verifyAdmin, catchAsync(changeStatus));
router.get("/", verifyAdmin, catchAsync(getAllUsers));
router.get("/:id", verifyUser, catchAsync(getUser));
router.delete("/:id", verifyUser, catchAsync(deleteUser));

module.exports = router;
