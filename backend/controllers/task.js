const Task = require("../models/task");
const User = require("../models/user");
const { Op } = require("sequelize");
const Notification = require("../models/notification");
const { notificationMessage } = require("../utils/emailTemplate");
const { sendMail } = require("../utils/mailer");

module.exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  const user = await User.findByPk(req.user.uid);
  await task.addAsignees(user);
  res.status(201).json(task);
};
module.exports.assignStaff = async (req, res) => {
  const task = await Task.findByPk(req.body.task);
  if (task.userId === req.user.uid) {
    const users = await User.findAll({
      where: {
        id: {
          [Op.or]: req.body.asignees,
        },
      },
    });
    await task.addAsignees(users);
    let emails = [];
    for (let user of users) {
      emails.push(user.email);
      const notify = await Notification.create({
        title: "Task assigned",
        content: "A task has been assigned to you",
        path: `/vms/${user.id}/task`,
        userId: `${user.id}`,
      });
      //send email
      const message = notificationMessage(
        `${user.firstName}`,
        "A task has been assigned to you. Click on the button below to view the details.",
        `${process.env.FRONTEND_URL}/vms/${user.id}/task`
      );
      const mailSent = sendMail(
        `${user.email}`,
        // emailAuth,
        `Task assigned`,
        message
      );
      console.log(mailSent);
    }
    res.status(201).json(task);
  } else {
    return res.status(401).send({ message: "Unauthorized Request" });
  }
};
module.exports.unAssignStaff = async (req, res) => {
  const user = await User.findByPk(req.body.user);
  const task = await Task.findByPk(req.params.id);
  if (task.userId === req.user.uid) {
    await task.removeAsignees(user);
    return res.status(201).json(task);
  } else {
    return res.status(401).send({ message: "Unauthorized Request" });
  }
};
module.exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.update(req.body, { where: { id } });
  res.status(201).json(task);
};
module.exports.getAllTasks = async (req, res) => {
  const tasks = await Task.findAll({ include: "asignedBy" });
  res.status(200).json(tasks);
};
module.exports.getTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({
    where: { id },
    include: [User, "asignees"],
  });
  res.status(200).json(task);
};
module.exports.getUserTasks = async (req, res) => {
  const { id } = req.params;
  const tasks = await Task.findAll({
    where: { userId: id },
    include: "asignees",
  });
  res.status(200).json(tasks);
};
module.exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  if (id === req.user.uid) {
    await Task.destroy({ where: { id } });
    return res.status(204).json({ message: "Task deleted" });
  } else {
    return res.status(401).send({ message: "Unauthorized action" });
  }
};
