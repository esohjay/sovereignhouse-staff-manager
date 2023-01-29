const Shift = require("../models/shift");
const User = require("../models/user");

module.exports.createShift = async (req, res) => {
  const shift = await Shift.create(req.body);
  res.status(201).json(shift);
};
module.exports.assignStaff = async (req, res) => {
  const user = await User.findByPk(req.body.user);
  const shift = await Shift.findByPk(req.body.shift);
  await shift.addUser(user);

  res.status(201).json(shift);
};
module.exports.updateShift = async (req, res) => {
  const { id } = req.params;
  const shift = await Shift.update(req.body, { where: { id } });
  res.status(201).json(shift);
};
module.exports.getAllShifts = async (req, res) => {
  const shifts = await Shift.findAll();
  res.status(200).json(shifts);
};
module.exports.getShift = async (req, res) => {
  const { id } = req.params;
  const shift = await Shift.findOne({ where: { id }, include: "users" });
  res.status(200).json(shift);
};
module.exports.deleteShift = async (req, res) => {
  const { id } = req.params;
  await Shift.destroy({ where: { id } });
  res.status(204).json({ message: "Shift deleted" });
};
