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
          model: 'Roles',
          key: 'id'
        }
      },
      companyId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Companies',
          key: 'id'
        }
      },
      departmentId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          model: 'Departments',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};