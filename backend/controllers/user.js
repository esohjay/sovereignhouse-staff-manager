const User = require("../models/user");

module.exports.createUser = async (req, res) => {
  //const {firstName, lastName, status, email, phone, contractType, address} = req.body
  const user = await User.create(req.body);
  console.log(user.toJson());
  res.status(201).json(user);
};
