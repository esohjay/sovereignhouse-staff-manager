const express = require("express");
const catchAsync = require("../middlewares/catchAsync");
const {
  createExpense,
  updateExpense,
  getAllExpenses,
  getExpense,
  deleteExpense,
} = require("../controllers/expenses");

const router = express.Router();
router.post("/", catchAsync(createExpense));
router.put("/:id", catchAsync(updateExpense));
router.get("/", catchAsync(getAllExpenses));
router.get("/:id", catchAsync(getExpense));
router.delete("/:id", catchAsync(deleteExpense));

module.exports = router;
