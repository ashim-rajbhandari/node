require("dotenv").config();

const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('postgres://postgres:ashim@localhost:5432/ekcrud');

const sequelize = new Sequelize('ekcrud', 'postgres', 'ashim', {
        host: 'localhost',
        dialect: 'postgres'
      });

sequelize.authenticate().then(() => {
    console.log('Database connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize ;