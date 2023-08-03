const { checkSchema } = require("express-validator");

let passwordValidator = checkSchema({
  password: {
    notEmpty: true,
    isLength: {
      options: { min: 3, max: 20 },
    },
  },
});

let loginValidator = checkSchema({
  username: {
    notEmpty: true,
  },
  password: {
    notEmpty: true,
  },
});

module.exports = { passwordValidator , loginValidator };
