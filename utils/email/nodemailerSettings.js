const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "outlook",
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

module.exports = transporter;