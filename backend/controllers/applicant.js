const Applicant = require("../models/applicant");
const Campaign = require("../models/campaign");
const Notification = require("../models/notification");
const {
  applicationMessage,
  notificationMessage,
} = require("../utils/emailTemplate");
const { sendMail } = require("../utils/mailer");

module.exports.createApplicant = async (req, res) => {
  const applicant = await Applicant.create(req.body);
  const notify = await Notification.create({
    title: "New application",
    content: "New volunteer application submitted",
  });
  //send email
  const messageApplicant = applicationMessage(req.body.firstName);
  const mailSent = sendMail(
    req.body.email,
    // emailAuth,
    `Application received`,
    messageApplicant
  );
  //send email
  const messageAdmin = notificationMessage(
    "Admin",
    "New volunteer application has been received",
    `${process.env.FRONTEND_URL}/vms/admin`
  );
  const adminMailSent = sendMail(
    "esohjay3@gmail.com",
    // emailAuth,
    `New application received`,
    messageAdmin
  );

  res.status(201).json(applicant);
};
module.exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file was uploaded");
  }
  console.log(req.file.filename);
  console.log(req.file);
  res.status(201).json({ fileSrc: req.file.filename });
};
module.exports.updateApplicant = async (req, res) => {
  const { id } = req.params;
  const applicant = await Applicant.update(req.body, { where: { id } });
  res.status(201).json(applicant);
};
module.exports.getAllApplicants = async (req, res) => {
  const applicants = await Applicant.findAll({ include: Campaign });
  res.status(200).json(applicants);
};
module.exports.getApplicant = async (req, res) => {
  const { id } = req.params;
  const applicant = await Applicant.findByPk(id);
  res.status(200).json(applicant);
};
module.exports.getCampaignApplicants = async (req, res) => {
  const { id } = req.params;
  const applicants = await Applicant.findAll({
    where: {
      CampaignId: id,
    },
  });
  res.status(200).json(applicants);
};
module.exports.deleteApplicant = async (req, res) => {
  const { id } = req.params;
  await Applicant.destroy({ where: { id } });
  res.status(204).json({ message: "Applicant deleted" });
};
