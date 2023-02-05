const User = require("../models/user");

module.exports.createUser = async (req, res) => {
  const user = await User.create({ ...req.body, id: req.user.uid });
  console.log(req.user);
  res.status(201).json(user);
};
module.exports.login = async (req, res) => {
  const [user, created] = await User.findOrCreate({
    where: { id: req.user.uid },
    defaults: {
      id: req.user.uid,
      email: req.user.email,
      firstName: "unknown",
      lastName: "user",
    },
  });

  console.log(user, created);
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
