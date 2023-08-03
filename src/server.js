const express = require('express');
// require('./models/index')

const passport = require('./config/passport')
const bodyParser = require('body-parser');
const path = require('path')

const app = express();

app.use(express.json());

// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(express.static('src/public'))

app.listen(3000, () => console.log("server started"));

const employeeRouter = require('./routes/api/employee')
app.use("/employees", employeeRouter);
const authRouter = require('./routes/api/auth')
app.use("/" , authRouter);

