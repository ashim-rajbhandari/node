const { transporter , mailOptions } = require('../config/nodemailer');


const sendEmail = async () => {
    await transporter.sendMail(mailOptions)
}


module.exports = { sendEmail } ;
  