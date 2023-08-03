const { employees, sequelize } = require("../../../models");
const ApiError = require("../../../errors/api/apiError");
const bcrypt = require("bcrypt");
const moment = require("moment");
require("dotenv").config();
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
  text: "Hi from your nodemailer project",
};

class AuthService {
  async register(req) {
    try {
      const result = await sequelize.transaction(async (t) => {
        let hashedPassword = await this.hashPassword(req.password);
        req.password = hashedPassword;

        let data = await employees.create(req, { transaction: t });

        await transporter.sendMail(mailOptions);

        return data;
      });
    } catch (err) {
      console.log(err);
      throw new ApiError(err.message, 400);
    }
  }

  async hashPassword(password) {
    try {
      let hash = await bcrypt.hash(password, 10);
      return hash;
    } catch (err) {
      throw new ApiError("Cannot hash password", 400);
    }
  }

  async login(req) {
    try {
      let data = await employees.findOne({ where: { username: req.username } });

      if (data === null) {
        throw new ApiError("Invalid Credential", 400);
      }

      let match = await bcrypt.compare(req.password, data.password);

      if (!match) {
        throw new ApiError("Invalid Credential", 400);
      }

      const generatedToken = generateToken(10);
      await data.update({
        token: generatedToken,
        token_expires_at: moment()
          .add(process.env.TOKEN_EXPIRY_TIME, process.env.TOKEN_EXPIRY)
          .format("YYYY-MM-DD H:mm:ss"),
      });

      return generatedToken;
    } catch (err) {
      console.log(err);
      throw new ApiError(err.message, 400);
    }
  }

  async logout(user) {
    try {
      user.update({
        token: null,
        token_expires_at: null,
      });

      return true;
    } catch (err) {
      console.log(err);
      throw new ApiError(err.message, 400);
    }
  }
}

const generateToken = (len = null) => {
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz1234567890";

  //specify the length for the new string
  var lenString = len ?? 8;
  var randomstring = "";

  //loop to select a new character in each iteration
  for (var i = 0; i < lenString; i++) {
    var rnum = Math.floor(Math.random() * characters.length);
    randomstring += characters.substring(rnum, rnum + 1);
  }

  return randomstring;
};

module.exports = AuthService;
