'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Categories', [{
      name: 'Musica',
      description: 'Categoria de musica',
      image: 'imagendemusica.jpg',
      timestamps: Date.now(),
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  }, 

  down: async (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Categories', null, {});
  }
};
