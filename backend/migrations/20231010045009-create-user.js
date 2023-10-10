'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false
      },
      photo: {
        type: Sequelize.STRING,
        allowNull:true
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          table: 'Roles',
          field: 'id'
        }
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          table: 'Companies',
          field: 'id'
        }
      },
      departmentId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          table: 'Departments',
          field: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};