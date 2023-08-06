const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: false, // Use false for TLS, or true for SSL (deprecated)
  auth: {
    user: process.env.MAIL_USERNAME, // Replace with your Mailtrap username
    pass: process.env.MAIL_PASSWORD, // Replace with your Mailtrap password
  },
});

let mailOptions = {
  from: "ashimc@gmail.com",
  to: "heloo@gmail.com",
  subject: "Nodemailer Project",
  text: "Hi from your nodemailer project , Successfully created your account",
};

module.exports = { transporter , mailOptions }