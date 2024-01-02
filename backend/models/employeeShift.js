'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EmployeeShift extends Model {
    static associate(models) {
      EmployeeShift.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'users',
        onDelete: 'CASCADE',
      });
    }
  }
  EmployeeShift.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: 'id',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'userId',
    },
    shiftId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'shiftId',
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'date',
    }
  }, {
    sequelize,
    modelName: 'EmployeeShift',
  });
  return EmployeeShift;
};