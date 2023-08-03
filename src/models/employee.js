// const { DataTypes } = require('sequelize');
// const sequelize = require('../database/database');
const sequelizePaginate = require('sequelize-paginate');

module.exports = (sequelize , DataTypes)  => {
  const employees = sequelize.define('employees', {
  // Model attributes are defined here
  first_name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      } ,
      last_name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      } ,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
          notEmpty: true
        },
      } ,
      image: {
        type: DataTypes.STRING,
        allowNull: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true
      },
      token_expires_at: {
        type: DataTypes.DATE,
        allowNull: true
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      }
}, {
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

sequelizePaginate.paginate(employees);
return employees;

};



