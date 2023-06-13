const Expenses = require("../models/expenses");
const User = require("../models/user");
const { sendMail } = require("../utils/mailer");
const { notificationMessage } = require("../utils/emailTemplate");
const fs = require("fs");
const { unlink } = require("fs/promises");

module.exports.createExpense = async (req, res) => {
  const expense = await Expenses.create(req.body);
  //send email
  const messageAdmin = notificationMessage(
    "Admin",
    "A new expense form has been submitted",
    `${process.env.FRONTEND_URL}/vms/${process.env.ADMIN_ID}/admin/expenses/${expense.id}`
  );
  const mailSent = sendMail(
    [process.env.ADMIN_EMAIL, process.env.ADMIN2_EMAIL],
    // emailAuth,
    `New Expense`,
    messageAdmin
  );
  res.status(201).json(expense);
};
module.exports.updateExpense = async (req, res) => {
  const { id } = req.params;

  // const expense = await Expenses.update(req.body, { where: { id } });
  const expense = await Expenses.findOne({ where: { id } });
  if (
    fs.existsSync(`public/uploads/receipts/${expense.image}`) &&
    req.body.image
  ) {
    // The file exists, so you can proceed with deleting it
    try {
      await unlink(`public/uploads/receipts/${expense.image}`);
      console.log("updated");
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  await expense.update(req.body);
  await expense.save();
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
  const expense = await Expenses.findOne({ where: { id }, include: User });
  res.status(200).json(expense);
};
module.exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await Expenses.findOne({ where: { id } });
  if (fs.existsSync(`public/uploads/receipts/${expense.image}`)) {
    // The file exists, so you can proceed with deleting it
    try {
      await unlink(`public/uploads/receipts/${expense.image}`);
      console.log("updated");
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  await expense.destroy();
  res.status(204).json({ message: "Expense deleted" });
};
