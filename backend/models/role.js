'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    
    static associate(models) {
      // define association here
      Role.hasMany(models.User, {
        foreignKey: 'roleId',
        as: 'users',
        onDelete: 'CASCADE'
      });

    }
  }
  Role.init({
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
    description:{
      type: DataTypes.STRING,
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
    modelName: 'Role',
  });
  return Role;
};