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
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'Pending'


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
      defaultValue: DataTypes.NOW,
    }
  }, {
    timestamps: true,
    sequelize,
    modelName: 'Company',
  });
  return Company;
};