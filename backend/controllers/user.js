const User = require("../models/user");
const { sendMail } = require("../utils/mailer");
const { welcomeMessage } = require("../utils/emailTemplate");
const Task = require("../models/task");
const Timesheet = require("../models/timesheet");
const admin = require("../config/firebase");
const getAuth = require("firebase-admin/auth");

module.exports.createUser = async (req, res) => {
  const user = await User.create({ ...req.body, id: req.user.uid });
  if (user) {
    try {
      await admin.auth().updateUser(req.user.uid, {
        displayName: `${user.firstName} ${user.lastName}`,
      });
    } catch (err) {
      console.log(err);
    }
    const message = welcomeMessage(
      req.body.firstName,
      `${process.env.FRONTEND_URL}/login`,
      req.body.email,
      req.body.password
    );
    sendMail(
      req.body.email,
      // emailAuth,
      `You have been added as ${req.body.contractType}`,
      message
    );
  }

  res.status(201).json(user);
};
module.exports.makeAdmin = async (req, res) => {
  const newAmin = await admin
    .auth()
    .setCustomUserClaims(req.user.uid, { admin: true });
  console.log("success");
  console.log(newAmin);
  res.status(200).json("done");
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
  res.status(201).json(user);
};
module.exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.update(req.body, { where: { id: id } });
  if (user) {
    try {
      await admin.auth().updateUser(id, {
        displayName: `${user.firstName} ${user.lastName}`,
      });
    } catch (err) {
      console.log(err);
    }
  }
  res.status(201).json(user);
};
module.exports.getAllUsers = async (req, res) => {
  const users = await User.findAll();
  console.log(users);
  res.status(200).json(users);
};
module.exports.getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, {
    include: ["shifts", Timesheet, "tasks"],
  });
  res.status(200).json(user);
};
module.exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  if (req.user.admin && req.user.uid === id) {
    res.status(401).send("Deletion of admin profile not allowed");
  } else if (
    (req.user.admin && req.user.uid !== id) ||
    (!req.user.admin && req.user.uid === id)
  ) {
    await User.destroy({ where: { id } });
    try {
      await admin.auth().deleteUser(id);
    } catch (err) {
      console.log(err);
    }
    res.status(204).json({ message: "user deleted" });
  } else {
    res.status(401).send("Permission denied");
  }
};
