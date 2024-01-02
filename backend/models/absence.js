'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Absence extends Model {
    static associate(models) {
      Absence.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Absence.belongsTo(models.EmployeeShift, {
        foreignKey: 'employeeShiftId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }
  Absence.init({
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
    employeeShiftId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'employeeShiftId'
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'reason'
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['Approved', 'Pending', 'Rejected']]
      },
      defaultValue: 'Pending'
    }
  }, {
    sequelize,
    modelName: 'Absence',
  });
  return Absence;
};
