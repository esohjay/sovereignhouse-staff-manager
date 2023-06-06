const Expenses = require("../models/expenses");

module.exports.createExpense = async (req, res) => {
  const expense = await Expenses.create(req.body);
  res.status(201).json(expense);
};
module.exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await Expenses.update(req.body, { where: { id } });
  res.status(201).json(expense);
};
module.exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file was uploaded" });
  }
  res.status(201).json({ fileSrc: req.file.filename });
};
module.exports.getAllExpenses = async (req, res) => {
  const expenses = await Expenses.findAll({ include: "user" });
  res.status(200).json(expenses);
};
module.exports.getExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await Expenses.findOne({ where: { id }, include: "users" });
  res.status(200).json(expense);
};
module.exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  await Expenses.destroy({ where: { id } });
  res.status(204).json({ message: "Expense deleted" });
};
