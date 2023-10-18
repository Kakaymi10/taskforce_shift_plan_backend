'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
   
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        onDelete: 'CASCADE'
      });
      User.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company',
        onDelete: 'CASCADE'
      });
      User.belongsTo(models.Department, {
        foreignKey: 'departmentId',
        as: 'department',
        onDelete: 'CASCADE'
      }); 
      }
  }
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: 'id',
    },
    name:{ 
      type: DataTypes.STRING,
      allowNull: false,
    },    
    email:{
       type:DataTypes.STRING,
        allowNull: false,
    },
    photo:{
      type: DataTypes.STRING,
    },
    password: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    roleId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'roleId',

    },
    companyId:{
     type:DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'companyId',
    },
    departmentId:{
       type: DataTypes.INTEGER,
       allowNull: false,
       defaultValue: 0,
        field: 'departmentId',
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'createdAt',
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updatedAt',

    },
    token: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    confirmedAt: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: 'Not yet',
      field: 'confirmedAt',
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'resetToken',
    }
  }, {
    timestamps: true,    
    sequelize,
    modelName: 'User',

  });
  return User;
};