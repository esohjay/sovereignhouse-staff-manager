const Task = require("../models/task");
const User = require("../models/user");
const { Op } = require("sequelize");

module.exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
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
    res.status(201).json(task);
  } else {
    return res.status(401).send("Unauthorized Request");
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
  await Task.destroy({ where: { id } });
  res.status(204).json({ message: "Task deleted" });
};
