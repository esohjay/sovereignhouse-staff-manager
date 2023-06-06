const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createExpense,
  updateExpense,
  getAllExpenses,
  getExpense,
  deleteExpense,
  uploadFile,
} = require("../controllers/expenses");
const { uploadReceipt } = require("../utils/multerConfig");

const router = express.Router();
router.post("/", catchAsync(createExpense));
router.put("/:id", catchAsync(updateExpense));
router.post("/upload", uploadReceipt.single("file"), catchAsync(uploadFile));
router.get("/", catchAsync(getAllExpenses));
router.get("/:id", catchAsync(getExpense));
router.delete("/:id", catchAsync(deleteExpense));

module.exports = router;
