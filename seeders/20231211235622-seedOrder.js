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
    await queryInterface.bulkInsert('Orders', [ {
      status: 'dimasak,ready,cancle',
      subtotal: 65.000,
      date: new Date('2023-12-31T13:00:00Z'),
      OrderDetailId: 1,
      kitchenId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      status: 'dimasak,ready,cancle',
      subtotal: 55.000,
      date: new Date('2023-12-31T14:00:00Z'),
      OrderDetailId: 2,
      kitchenId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
