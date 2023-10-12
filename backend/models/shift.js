'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shift extends Model {
    
    static associate(models) {
      
      Shift.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE'
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
    date:{
      type: DataTypes.DATE,
      allowNull: false,
    },    
    start_time:{
       type: DataTypes.DATE,
        allowNull: false,
    },
    end_time: {
      type:DataTypes.DATE,
      allowNull: false,
    },
    userId: {
     type: DataTypes.INTEGER,
      allowNull: false,
      field: 'userId',
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
    modelName: 'Shift',
  });
  return Shift;
};