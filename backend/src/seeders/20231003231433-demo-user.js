module.exports = {
    up: (queryInterface, Sequelize) => queryInterface.bulkInsert('TestUsers', [{
        firstName: 'John',
        lastName: 'Doe',
        email: 'example@example.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }]),
    down: (queryInterface, Sequelize) => queryInterface.bulkDelete('TestUsers', null, {})
  };