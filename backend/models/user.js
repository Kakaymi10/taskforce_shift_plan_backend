'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.belongsTo(models.Role, {
        foreignKey: 'roleId',
        as: 'role',
        onDelete: 'CASCADE',
      });
      User.belongsTo(models.Company, {
        foreignKey: 'companyId',
        as: 'company',
        onDelete: 'CASCADE',
      });
      User.belongsTo(models.Department, {
        foreignKey: 'departmentId',
        as: 'department',
        onDelete: 'CASCADE',
      });
      User.belongsToMany(models.Shift, {
        through: models.EmployeeShift,
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      User.hasMany(models.EmployeeShift, {
        foreignKey: 'userId',
        as: 'shifts'
      })
      User.hasMany(models.Absence, {
        foreignKey: 'userId',
        as: 'absences',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    }
  }
  User.init(
    {
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
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      photo: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'roleId',
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'companyId',
      },
      departmentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: 'departmentId',
      },
      confirmed: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'confirmed',
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
    },
    {
      timestamps: true,
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
