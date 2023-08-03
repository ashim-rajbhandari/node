'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, DataTypes) {
    return queryInterface.createTable('employees', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      first_name:{
        type: DataTypes.STRING,
        allowNull: false,
      } ,
      last_name:{
        type: DataTypes.STRING,
        allowNull: false,
      } ,
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
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
        allowNull: false,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down (queryInterface) {
    return queryInterface.dropTable('employees');
  }
};
