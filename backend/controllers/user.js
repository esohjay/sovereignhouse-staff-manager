const User = require("../models/user");

module.exports.createUser = async (req, res) => {
  //const {firstName, lastName, status, email, phone, contractType, address} = req.body
  const user = await User.create(req.body);
  console.log(user.toJson());
  res.status(201).json(user);
};
module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.update(req.body, { where: { id: id } });
  console.log(JSON.stringify(user));
  res.status(201).json(user);
};
module.exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
};
module.exports.getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  res.status(200).json(user);
};
module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.destroy({ where: { id } });
  res.status(204).json({ message: "user deleted" });
};
