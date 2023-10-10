'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
  
    static associate(models) {      
      Company.hasMany(models.User, {
        foreignKey: 'companyId',
        as: 'users',
        onDelete: 'CASCADE'
      });

      Company.hasMany(models.Department, {
        foreignKey: 'companyId',
        as: 'departments',
        onDelete: 'CASCADE'
      });
      
    }
  }
  Company.init({
    id:{
     type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name:{
     type: DataTypes.STRING,
      allowNull: false,
    },
    address:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    isApproved: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'createdAt',
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'updatedAt',
    }
  }, {
    sequelize,
    modelName: 'Company',
  });
  return Company;
};