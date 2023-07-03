const Student_Application = require("../models/student-application");
const Notification = require("../models/notification");
const {
  applicationMessage,
  studentApplicationMessage,
  studentApplicationMessageUpdate,
} = require("../utils/emailTemplate");
const { sendMail } = require("../utils/mailer");
const XLSX = require("xlsx");

const fs = require("fs");
const { unlink } = require("fs/promises");

module.exports.createApplication = async (req, res) => {
  const student_application = await Student_Application.create(req.body);

  const student = await Student_Application.findAll({ raw: true });
  //create new workbook
  const workbook = XLSX.utils.book_new();

  //   create worksheet
  const worksheet = XLSX.utils.json_to_sheet(student);
  // add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
  if (fs.existsSync("public/students-application/applicants_list.xlsx")) {
    // The file exists, so you can proceed with deleting it
    try {
      await unlink("public/students-application/applicants_list.xlsx");
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  // write workbook to a file
  XLSX.writeFile(workbook, "public/students-application/applicants_list.xlsx");
  //send email
  const messageApplicant = applicationMessage(req.body.first_name);
  const mailSent = sendMail(
    req.body.email,
    // emailAuth,
    `Application received`,
    messageApplicant
  );
  const messageAdmin = studentApplicationMessage(
    "Admin",
    `${student_application.first_name}`,
    `${student_application.last_name}`,
    `${student_application.email}`,
    `${student_application.phone}`,
    `${process.env.FRONTEND_URL}/vms/${process.env.ADMIN_ID}/admin/students-application/${student_application.id}`
  );
  const adminMailSent = sendMail(
    [process.env.ADMIN_EMAIL, process.env.ADMIN2_EMAIL],
    // emailAuth,
    `New student application received`,
    messageAdmin
  );

  res.status(201).json(student_application);
};
module.exports.getAllApplicantions = async (req, res) => {
  const applicants = await Student_Application.findAll();
  res.status(200).json(applicants);
};
module.exports.exportAllApplicantions = async (req, res) => {
  const student = await Student_Application.findAll({ raw: true });
  //create new workbook
  const workbook = XLSX.utils.book_new();

  //   create worksheet
  const worksheet = XLSX.utils.json_to_sheet(student);
  // add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
  if (fs.existsSync("public/students-application/applicants_list.xlsx")) {
    // The file exists, so you can proceed with deleting it
    try {
      await unlink("public/students-application/applicants_list.xlsx");
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  // write workbook to a file
  XLSX.writeFile(workbook, "public/students-application/applicants_list.xlsx");
  res.status(200).json({ message: "file created" });
};
module.exports.getApplication = async (req, res) => {
  const { id } = req.params;
  const student = await Student_Application.findByPk(id);
  res.status(200).json(student);
};
// module.exports.uploadFile = async (req, res) => {
//   if (!req.file) {
//     return res.status(400).send({ message: "No file was uploaded" });
//   }
//   res.status(201).json({ fileSrc: req.file.filename });
// };
module.exports.updateApplication = async (req, res) => {
  const { id } = req.params;
  const { status, email } = req.body;
  console.log(req.body);
  const applicant = await Student_Application.update(req.body, {
    where: { id },
  });
  //send email
  let content;
  if (status === "rejected") {
    content =
      "Thank you for your interest in our computer learning programme. We appreciate the time and effort you invested in your application. After careful consideration, we regret to inform you that you have not been selected for this programme. We would like to thank you for your enthusiasm and wish you all the best in your future endeavors.";
  } else if (status === "accepted") {
    content =
      "You have been accepted into the Computer Learning Program at Sovereign House GH. The Computer Learning Program is an intensive programme that will teach you the fundamentals of computer science, programming, networking and much more. You will learn from world-class instructors, work on real-world projects, and network with peers and mentors.";
  }
  if (status === "rejected" || status === "accepted") {
    const messageApplicant = studentApplicationMessageUpdate(
      req.body.first_name,
      content
    );
    const mailSent = sendMail(
      email,
      // emailAuth,
      `Application update`,
      messageApplicant
    );
  }

  res.status(201).json(applicant);
};
// module.exports.requestInterview = async (req, res) => {
//   const { id } = req.params;
//   const { email, date, name } = req.body;

//   const messageApplicant = requestInterview(name, date);
//   const adminMailSent = sendMail(
//     email,
//     // emailAuth,
//     `Interview Request`,
//     messageApplicant
//   );
//   res.status(201).json({ message: "Message sent succesfully" });
// };
// module.exports.scheduleInterview = async (req, res) => {
//   const { id } = req.params;
//   const { status, email, message, link, name } = req.body;

//   const applicant = await Applicant.update(req.body, { where: { id } });
//   //send email
//   const messageApplicant = interviewMessage(name, link);
//   const adminMailSent = sendMail(
//     email,
//     // emailAuth,
//     `Interview invitation`,
//     messageApplicant
//   );
//   res.status(201).json(applicant);
// };

// module.exports.getApplicant = async (req, res) => {
//   const { id } = req.params;
//   const applicant = await Applicant.findByPk(id, { include: Campaign });
//   res.status(200).json(applicant);
// };
// module.exports.getCampaignApplicants = async (req, res) => {
//   const { id } = req.params;
//   const applicants = await Applicant.findAll({
//     where: {
//       CampaignId: id,
//     },
//   });
//   res.status(200).json(applicants);
// };
module.exports.deleteApplication = async (req, res) => {
  const { id } = req.params;
  const application = await Student_Application.findOne({ where: { id } });
  await application.destroy();

  const student = await Student_Application.findAll({ raw: true });
  //create new workbook
  const workbook = XLSX.utils.book_new();

  //   create worksheet
  const worksheet = XLSX.utils.json_to_sheet(student);
  // add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet 1");
  if (fs.existsSync("public/students-application/applicants_list.xlsx")) {
    // The file exists, so you can proceed with deleting it
    try {
      await unlink("public/students-application/applicants_list.xlsx");
    } catch (err) {
      return res.status(400).json(err);
    }
  }
  // write workbook to a file
  XLSX.writeFile(workbook, "public/students-application/applicants_list.xlsx");
  res.status(204).json({ message: "Applicant deleted" });
};
