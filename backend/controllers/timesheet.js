const Timesheet = require("../models/timesheet");
const User = require("../models/user");

module.exports.createTimesheet = async (req, res) => {
  const timesheet = await Timesheet.create(req.body);
  res.status(201).json(timesheet);
};
module.exports.updateTimesheet = async (req, res) => {
  const { id } = req.params;
  const timesheet = await Timesheet.update(req.body, { where: { id } });
  console.log(JSON.stringify(timesheet));
  res.status(201).json(timesheet);
};
module.exports.getAllTimesheets = async (req, res) => {
  const timesheets = await Timesheet.findAll({ include: ["user", "shift"] });
  res.status(200).json(timesheets);
};
module.exports.getUserTimesheets = async (req, res) => {
  const { id } = req.params;
  const timesheets = await Timesheet.findAll({
    where: { userId: id },
    include: ["shift"],
    order: [["createdAt", "DESC"]],
    limit: 10,
  });
  // const { count, rows } = await Timesheet.findAndCountAll({
  //   where: { userId: id },
  //   include: ["shift"],
  //   order: [["createdAt", "DESC"]],
  //   limit: 10,
  // });

  res.status(200).json(timesheets);
};
module.exports.getTimesheet = async (req, res) => {
  const { id } = req.params;
  const timesheet = await Timesheet.findByPk(id);
  res.status(200).json(timesheet);
};
module.exports.deleteTimesheet = async (req, res) => {
  const { id } = req.params;
  await Timesheet.destroy({ where: { id } });
  res.status(204).json({ message: "Timesheet deleted" });
};
