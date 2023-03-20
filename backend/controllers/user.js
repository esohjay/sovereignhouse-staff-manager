const User = require("../models/user");
const { sendMail } = require("../utils/mailer");
const { welcomeMessage } = require("../utils/emailTemplate");
const Task = require("../models/task");
const Timesheet = require("../models/timesheet");
const admin = require("../config/firebase");
const getAuth = require("firebase-admin/auth");

module.exports.createUser = async (req, res) => {
  const { email } = req.body;
  let firebaseUser = null;
  try {
    const user = await admin.auth().createUser({
      email: req.body.email,
      emailVerified: false,
      // phoneNumber: `${req.body.phone}`,
      password: req.body.password,
      displayName: `${req.body.firstName} ${req.body.lastName}`,
      disabled: false,
    });
    firebaseUser = user;
  } catch (error) {
    return res.status(400).json(error);
  }
  const user = await User.create({
    ...req.body,
    id: firebaseUser.uid,
  });

  //send email
  const message = welcomeMessage(
    req.body.firstName,
    `${process.env.FRONTEND_URL}/login`,
    req.body.email,
    req.body.password
  );
  const mailSent = sendMail(
    req.body.email,
    // emailAuth,
    `You have been added as ${req.body.contractType}`,
    message
  );

  if (mailSent) {
    res.status(201).json(user);
  } else {
    res
      .status(400)
      .json({ message: "User has been created but email not sent" });
  }
};
module.exports.makeAdmin = async (req, res) => {
  const newAmin = await admin
    .auth()
    .setCustomUserClaims(req.user.uid, { admin: true });
  console.log("success");
  console.log(newAmin);
  res.status(200).json("done");
};
module.exports.resetPassword = async (req, res) => {
  try {
    await admin.auth().updateUser(req.body.userId, {
      password: `${req.body.password}`,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
  //send email
  const message = welcomeMessage(
    req.body.firstName,
    `${process.env.FRONTEND_URL}/login`,
    req.body.email,
    req.body.password
  );
  const mailSent = sendMail(
    req.body.email,
    // emailAuth,
    `Your password has been reset`,
    message
  );

  if (mailSent) {
    res.status(201).json({ message: "Password reset successfully" });
  } else {
    res
      .status(400)
      .json({ message: "Password has been reset but can't send email" });
  }
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
