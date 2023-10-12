// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Role extends Model {
    
//     static associate(models) {
//       // define association here
//       Role.hasMany(models.User, {
//         foreignKey: 'roleId',
//         as: 'users',
//         onDelete: 'SET NULL'
//       });

//     }
//   }
//   Role.init({
//     id: {
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//       type: DataTypes.INTEGER,
//       field: 'id',
//     },
//     name:{
//       type: DataTypes.STRING,
//       allowNull: false,
//     },  
//     description:{
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     createdAt: {
//       allowNull: false,
//       type: DataTypes.DATE,
//       field: 'createdAt',
//     },
//     updatedAt: {
//       allowNull: false,
//       type: DataTypes.DATE,
//       field: 'updatedAt',
//     }
//   }, {
//     sequelize,
//     modelName: 'Role',
//   });
//   return Role;
// };

const ROLE = {
  ADMIN: 'admin',
  BASIC: 'basic'
}

module.exports = {
  ROLE: ROLE,
  users: [
    { id: 1, name: 'Kyle', role: ROLE.ADMIN },
    { id: 2, name: 'Sally', role: ROLE.BASIC },
    { id: 3, name: 'Joe', role: ROLE.BASIC }
  ],
  projects: [
    { id: 1, name: "Kyle's Project", userId: 1 },
    { id: 2, name: "Sally's Project", userId: 2 },
    { id: 3, name: "Joe's Project", userId: 3 }
  ]
}