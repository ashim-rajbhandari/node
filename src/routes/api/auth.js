const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/api/auth/authController');
const employeeValidator = require('../../validators/employeeValidation');
const { passwordValidator , loginValidator } = require('../../validators/passwordValidation');
const validator = require('../../middleware/api/validate');
const passport = require('../../config/passport')

const authController = new AuthController();

router.post('/register', employeeValidator,passwordValidator , validator , authController.register);
router.post('/login', loginValidator , validator , authController.login);
router.post('/logout',  passport.authenticate('bearer', { session: false }) , authController.logout)

module.exports = router;