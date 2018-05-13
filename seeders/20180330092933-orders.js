'use strict';
var faker = require('faker');

module.exports = {


  up: (queryInterface, Sequelize) => {


    let fakeData = new Array(100);

    for(let i = 0; i < fakeData.length; i++)
    {

        fakeData[i] = {title: faker.name.findName(),
            description: faker.lorem.words(),
            price: faker.finance.amount()}
    }

      return queryInterface.bulkInsert('Orders',  fakeData, {});

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
