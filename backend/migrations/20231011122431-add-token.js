'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'token', {
      type: Sequelize.STRING,
      allowNull: true, // Update this to false if 'token' is required
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'token');
  },
};
