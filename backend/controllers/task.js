const Task = require("../models/Task");
const User = require("../models/user");
const { Op } = require("sequelize");

module.exports.createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
};
module.exports.assignStaff = async (req, res) => {
  const users = await User.findAll({
    where: {
      id: {
        [Op.or]: req.body.asignees,
      },
    },
  });
  const task = await Task.findByPk(req.body.task);
  await task.addAsignees(users);
  res.status(201).json(task);
};
module.exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.update(req.body, { where: { id } });
  res.status(201).json(task);
};
module.exports.getAllTasks = async (req, res) => {
  const tasks = await Task.findAll();
  res.status(200).json(tasks);
};
module.exports.getTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({
    where: { id },
    include: ["asignees", "asignedBy"],
  });
  res.status(200).json(task);
};
module.exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  await Task.destroy({ where: { id } });
  res.status(204).json({ message: "Task deleted" });
};
