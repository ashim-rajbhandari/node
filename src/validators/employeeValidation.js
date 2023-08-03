const { checkSchema } = require("express-validator");

let employeeValidator = checkSchema({
  first_name: {
    notEmpty : true,
    isAlpha : true,
    isLength: {
      options: { min: 3, max: 20 },
    }
  },
  last_name: {
    notEmpty : true,
    isAlpha : true,
    isLength: {
      options: { min: 3, max: 20 },
    }
  },
  username: {
    notEmpty : true,
    isAlphanumeric : true,
    isLength: {
      options: { min: 3, max: 20 },
    }
  },
  email: {
    trim: true,
    isEmail: {
      errorMessage: "Not a valid email",
    },
  },
});

module.exports = employeeValidator ;
