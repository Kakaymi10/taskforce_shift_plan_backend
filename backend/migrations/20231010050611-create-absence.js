'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Absences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE,
        allowNull:false
      },
      reason: {
        type: Sequelize.STRING,
        allowNull:false
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          table: 'Users',
          field: 'id'
        }
      },
      managerId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references: {
          table: 'Users',
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
    await queryInterface.dropTable('Absences');
  }
};