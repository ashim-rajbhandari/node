const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const { employees } = require('../models')
const moment = require("moment");

passport.use(
  new BearerStrategy(async function (token, done , res) {
      
    try{
      let employee = await employees.findOne({ where: {token: token } });
     
      if (!employee) {
        return done(null , false);
      }

      if(moment() >= employee.token_expires_at){
        return done(null , false , { message: "Token expired."});
      }
      return done(null, employee, { scope: "read" });
    } catch (err) {
      console.log(err);
      return done(err);
    }
  })
);

module.exports = passport;
