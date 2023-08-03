const { checkSchema } = require("express-validator");
const { employees }  = require("../models");

let employeeValidator = checkSchema({
  first_name: {
    notEmpty: {
      errorMessage: "First name cannot be empty",
    },
    isAlpha: {
      errorMessage: "First name must contain only alphabetic characters",
    },
    isLength: {
      errorMessage: "First name must be between 3 and 20 characters",
      options: { min: 3, max: 20 },
    },
  },
  last_name: {
    notEmpty: {
      errorMessage: "Last name cannot be empty",
    },
    isAlpha: {
      errorMessage: "Last name must contain only alphabetic characters",
    },
    isLength: {
      errorMessage: "Last name must be between 3 and 20 characters",
      options: { min: 3, max: 20 },
    },
  },
  username: {
    notEmpty: {
      errorMessage: "Username cannot be empty",
    },
    isAlphanumeric: {
      errorMessage: "Username must contain only alphanumeric characters",
    },
    isLength: {
      errorMessage: "Username must be between 3 and 20 characters",
      options: { min: 3, max: 20 },
    },
  },
  email: {
    trim: true,
    isEmail: {
      errorMessage: "Not a valid email",
    },
    custom: {
      options: async (value) => {
        const employee = await employees.findOne({ where: { email: value } });
        if (employee) {
          return Promise.reject("Email already exists");
          // throw new Error("Email already exists");
        }
      },
    }
  },
});

module.exports = employeeValidator ;
