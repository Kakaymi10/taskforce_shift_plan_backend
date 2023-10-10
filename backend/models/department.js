'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    
    static associate(models) {
      // define association here
      Department.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company',
        onDelete: 'CASCADE'
      });
      Department.hasMany(models.User, {
        foreignKey: 'departmentId',
        as: 'users',
        onDelete: 'CASCADE'
      });
    }
  }
  Department.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: 'id',
    },
    name: {
      type:DataTypes.STRING,
      allowNull: false,
    },
    companyId:{
       type:DataTypes.INTEGER,
        allowNull: false,
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
    modelName: 'Department',
  });
  return Department;
};