const Applicant = require("../models/applicant");
const Campaign = require("../models/campaign");
const Notification = require("../models/notification");
const {
  applicationMessage,
  notificationMessage,
  interviewMessage,
  requestInterview,
} = require("../utils/emailTemplate");
const { sendMail } = require("../utils/mailer");

const fs = require("fs");
const { unlink } = require("fs/promises");

module.exports.createApplicant = async (req, res) => {
  const applicant = await Applicant.create(req.body);
  const notify = await Notification.create({
    title: "New application",
    content: "New volunteer application submitted",
    path: `/vms/${process.env.ADMIN_ID}/admin/recruitment`,
    userId: `${process.env.ADMIN_ID}`,
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
    `${process.env.FRONTEND_URL}/vms/${process.env.ADMIN_ID}/admin/recruitment/applicant/all/${applicant.id}`
  );
  const adminMailSent = sendMail(
    [process.env.ADMIN_EMAIL, process.env.ADMIN2_EMAIL],
    // emailAuth,
    `New application received`,
    messageAdmin
  );

  res.status(201).json(applicant);
};
module.exports.uploadFile = async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file was uploaded" });
  }
  res.status(201).json({ fileSrc: req.file.filename });
};
module.exports.updateApplicant = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const applicant = await Applicant.update(req.body, { where: { id } });
  res.status(201).json(applicant);
};
module.exports.requestInterview = async (req, res) => {
  const { id } = req.params;
  const { email, date, name, interviewer } = req.body;

  const messageApplicant = requestInterview(name, date, interviewer);
  const adminMailSent = sendMail(
    email,
    // emailAuth,
    `Interview Request`,
    messageApplicant
  );
  res.status(201).json({ message: "Message sent succesfully" });
};
module.exports.scheduleInterview = async (req, res) => {
  const { id } = req.params;
  const { status, email, message, link, name } = req.body;

  const applicant = await Applicant.update(req.body, { where: { id } });
  //send email
  const messageApplicant = interviewMessage(name, link);
  const adminMailSent = sendMail(
    email,
    // emailAuth,
    `Interview invitation`,
    messageApplicant
  );
  res.status(201).json(applicant);
};

module.exports.getAllApplicants = async (req, res) => {
  const applicants = await Applicant.findAll({ include: Campaign });
  res.status(200).json(applicants);
};
module.exports.getApplicant = async (req, res) => {
  const { id } = req.params;
  const applicant = await Applicant.findByPk(id, { include: Campaign });
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
  const application = await Applicant.findOne({ where: { id } });
  if (fs.existsSync(`public/uploads/resumes/${application.fileSrc}`)) {
    // The file exists, so you can proceed with deleting it
    try {
      await unlink(`public/uploads/resumes/${application.fileSrc}`);
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  await application.destroy();
  res.status(204).json({ message: "Applicant deleted" });
};
