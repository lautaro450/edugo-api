'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
   return queryInterface.bulkInsert('Users', [
    {
      nickname: 'Dante Perea',
      password: '3e937a097c3260a80ff766d6a52f5788',
      roles: 'admin',
      email:'dante.perea@coderbunker.com',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    },
    {
      nickname: 'Lautaro Perea',
      password: '2a528464344d3eca27b654b687b3a5a1',
      roles: '',
      email:'dante.perea@dsoftware.dev',
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString()
    }
  ],{});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Users', null, {});
  }
};
