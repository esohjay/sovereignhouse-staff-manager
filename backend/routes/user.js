const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const { createUser } = require("../controllers/user");

const router = express.Router();
router.post("/", catchAsync(createUser));

module.exports = router;
