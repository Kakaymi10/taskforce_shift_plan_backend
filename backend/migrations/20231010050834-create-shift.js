'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Shifts', {
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
      start_time: {
        type: Sequelize.DATE,
          allowNull:false
      },
      end_time: {
        type: Sequelize.DATE,
          allowNull:false
      },
      employeeId: {
        type: Sequelize.INTEGER,
          allowNull:false,
          references: {
            model: 'Users',
            key: 'id'
          }
      },
      managerId: {
        type: Sequelize.INTEGER,
          allowNull:false,
          references: {
            model: 'Users',
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
    await queryInterface.dropTable('Shifts');
  }
};