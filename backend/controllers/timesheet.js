const Timesheet = require("../models/timesheet");

module.exports.createTimesheet = async (req, res) => {
  const lastestTimesheet = await Timesheet.findAll({
    limit: 1,
    order: [["createdAt", "DESC"]],
  });
  console.log(lastestTimesheet);
  if (
    lastestTimesheet &&
    lastestTimesheet.length &&
    !lastestTimesheet.endTime
  ) {
    res.status(500).send({ message: "You have a shift in progress" });
  } else {
    const timesheet = await Timesheet.create(req.body);
    res.status(201).json(timesheet);
  }
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
