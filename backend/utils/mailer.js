const nodemailer = require("nodemailer");
require("dotenv").config();
module.exports.sendMail = async (receiverEmail, subject, body) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  let mailDetails = {
    from: "Sovereign House",
    to: receiverEmail,
    subject: subject,
    html: body,
  };

  await mailTransporter.sendMail(mailDetails, function (err, data) {
    if (err) {
      console.log("Error Occurs", err);
    } else {
      console.log("Email sent successfully " + data.messageId);
    }
  });
};
