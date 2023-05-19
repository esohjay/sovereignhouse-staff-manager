const Shift = require("../models/shift");
const User = require("../models/user");
const Notification = require("../models/notification");
const { notificationMessage } = require("../utils/emailTemplate");
const { sendMail } = require("../utils/mailer");

module.exports.createShift = async (req, res) => {
  const shift = await Shift.create(req.body);
  res.status(201).json(shift);
};
module.exports.assignStaff = async (req, res) => {
  const user = await User.findByPk(req.body.user);
  const shift = await Shift.findByPk(req.body.shift);
  await shift.addUser(user);
  const notify = await Notification.create({
    title: "Shift assigned",
    content: "You have been assigned to a shift",
    path: `/vms/${user.id}/timesheet`,
    userId: `${user.id}`,
  });
  //send email
  const message = notificationMessage(
    `${user.firstName}`,
    "You have been assigned to a shift. Click on the button below to view the details.",
    `${process.env.FRONTEND_URL}/vms/${user.id}/timesheet`
  );
  const mailSent = sendMail(
    `${user.email}`,
    // emailAuth,
    `Shift assigned`,
    message
  );
  res.status(201).json(shift);
};
module.exports.unAssignStaff = async (req, res) => {
  const user = await User.findByPk(req.body.user);
  const shift = await Shift.findByPk(req.body.shift);
  await shift.removeUser(user);
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
