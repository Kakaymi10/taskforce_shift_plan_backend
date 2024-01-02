'use strict';
const { allow } = require('joi');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    static associate(models) {
      Shift.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Shift.belongsToMany(models.User, {
        through: models.EmployeeShift,
        foreignKey: 'shiftId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Shift.hasMany(models.EmployeeShift, {
        foreignKey: 'shiftId',
        as: 'employees',
      });
    }
  }
  Shift.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: 'id',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'name',
    },
    startTime:{
      type: DataTypes.STRING,
      allowNull: false,
      field: 'startTime'
    },
    endTime:{
      type: DataTypes.STRING,
      allowNull: false,
      field: 'endTime'
    },
    companyId:{
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'companyId'
    },
  }, {
    sequelize,
    modelName: 'Shift',
  });
  return Shift;
};