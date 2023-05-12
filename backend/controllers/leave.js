const Leave = require("../models/leave");
const User = require("../models/user");
const { sendMail } = require("../utils/mailer");
const { notificationMessage } = require("../utils/emailTemplate");
const Notification = require("../models/notification");

module.exports.createLeave = async (req, res) => {
  const leave = await Leave.create({ ...req.body, userId: req.user.uid });
  const notifyAdmin = await Notification.create({
    title: "New leave reequest",
    content: "A memeber of staff has submitted a leave request.",
    path: `${process.env.FRONTEND_URL}/vms/${process.env.ADMIN_ID}/admin/leave/${leave.id}`,
    userId: `${process.env.ADMIN_ID}`,
  });
  //send email
  const messageAdmin = notificationMessage(
    "Admin",
    "A staff member has submitted a leave request. You can click on the button below to view the details of the request.",
    `${process.env.FRONTEND_URL}/vms/${process.env.ADMIN_ID}/admin/leave/${leave.id}`
  );
  const mailSent = sendMail(
    `${process.env.ADMIN_EMAIL}`,
    // emailAuth,
    `New leave request`,
    messageAdmin
  );

  // if (mailSent) {
  //   res.status(201).json(user);
  // } else {
  //   res
  //     .status(400)
  //     .json({ message: "User has been created but email not sent" });
  // }
  res.status(201).json(leave);
};
module.exports.updateLeave = async (req, res) => {
  const { id } = req.params;
  const leave = await Leave.update(req.body, { where: { id } });
  const user = await User.findByPk(req.body.userId);
  const notify = await Notification.create({
    title: "Update on leave request",
    content: "There has been an update on your leave request",
    path: `${process.env.FRONTEND_URL}/vms/${user.id}/leave/${id}`,
    userId: `${user.id}`,
  });
  //send email
  const message = notificationMessage(
    `${user.firstName}`,
    "There has been an update on your leave request. Click on the button below to view the update.",
    `${process.env.FRONTEND_URL}/vms/${user.id}/leave/${id}`
  );
  const mailSent = sendMail(
    `${user.email}`,
    // emailAuth,
    `Leave request update`,
    message
  );
  res.status(201).json(leave);
};
module.exports.getAllLeaves = async (req, res) => {
  const leaves = await Leave.findAll({ include: "user" });
  res.status(200).json(leaves);
};
module.exports.getUserLeave = async (req, res) => {
  const { id } = req.params;
  const leaveReaquests = await Leave.findAll({
    where: { userId: id },
  });
  res.status(200).json(leaveReaquests);
};
module.exports.getLeave = async (req, res) => {
  const { id } = req.params;
  const leave = await Leave.findByPk(id, { include: "user" });
  res.status(200).json(leave);
};
module.exports.deleteLeave = async (req, res) => {
  const { id } = req.params;
  await Leave.destroy({ where: { id } });
  res.status(204).json({ message: "Leave deleted" });
};
