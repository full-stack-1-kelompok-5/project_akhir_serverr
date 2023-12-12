'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('OrderDetails', [
      {
        order: 1,
        item: 1, 
        quantity: 2,
        kitchenId: 1, 
        subtotal: 65.000,
        menuId: 1, 
        waitersId: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        order: 2, 
        item: 2, 
        quantity: 1,
        kitchenId: 1,
        subtotal: 55.000,
        menuId: 2, 
        waitersId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('OrderDetails', null, {});
  }
};
