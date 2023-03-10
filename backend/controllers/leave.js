const Leave = require("../models/leave");

module.exports.createLeave = async (req, res) => {
  const leave = await Leave.create({ ...req.body, userId: req.user.uid });
  res.status(201).json(leave);
};
module.exports.updateLeave = async (req, res) => {
  const { id } = req.params;
  const leave = await Leave.update(req.body, { where: { id } });
  res.status(201).json(leave);
};
module.exports.getAllLeaves = async (req, res) => {
  const leaves = await Leave.findAll({ include: "user" });
  res.status(200).json(leaves);
};
module.exports.getLeave = async (req, res) => {
  const { id } = req.params;
  const Leave = await Leave.findByPk(id, { include: "user" });
  res.status(200).json(Leave);
};
module.exports.deleteLeave = async (req, res) => {
  const { id } = req.params;
  await Leave.destroy({ where: { id } });
  res.status(204).json({ message: "Leave deleted" });
};
