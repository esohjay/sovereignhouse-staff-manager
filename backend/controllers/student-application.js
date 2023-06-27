const Student_Application = require("../models/student-application");
const Notification = require("../models/notification");
const {
  applicationMessage,
  studentApplicationMessage,
  interviewMessage,
  requestInterview,
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
// module.exports.updateApplicant = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   const applicant = await Applicant.update(req.body, { where: { id } });
//   res.status(201).json(applicant);
// };
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
// module.exports.deleteApplicant = async (req, res) => {
//   const { id } = req.params;
//   const application = await Applicant.findOne({ where: { id } });
//   if (fs.existsSync(`public/uploads/resumes/${application.fileSrc}`)) {
//     // The file exists, so you can proceed with deleting it
//     try {
//       await unlink(`public/uploads/resumes/${application.fileSrc}`);
//     } catch (err) {
//       return res.status(400).json(err);
//     }
//   }
//   await application.destroy();
//   res.status(204).json({ message: "Applicant deleted" });
// };
