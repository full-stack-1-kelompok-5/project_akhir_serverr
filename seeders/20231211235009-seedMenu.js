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
    await queryInterface.bulkInsert('Menus', [
      {
        item_name: 'Spaghetti Bolognese',
        price: 65.000,
        image: 'https://www.freepik.com/free-photo/fresh-pasta-with-hearty-bolognese-parmesan-cheese-generated-by-ai_40967605.htm#query=spaghetti%20bolognese&position=3&from_view=keyword&track=ais&uuid=6e1ce2fe-8949-46bf-be6f-9efc74f64ef0',
        adminId: 1, 
        waitersId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        item_name: 'Chicken Alfredo',
        price: 55.000,
        image: 'https://www.shutterstock.com/id/image-photo/pasta-alfredo-chicken-55432798',
        adminId: 1, 
        waitersId: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        item_name: 'Margherita Pizza',
        price: 82.000,
        image: 'https://www.google.com/search?q=link+imege+Margherita+Pizza+&tbm=isch&ved=2ahUKEwiUuavNlICDAxWimmMGHaGaC0YQ2-cCegQIABAA&oq=link+imege+Margherita+Pizza+&gs_lcp=CgNpbWcQAzoECCMQJzoFCAAQgAQ6BAgAEB46BggAEAcQHjoICAAQCBAHEB5QoQhYpUVg50ZoAHAAeACAAd0BiAG3E5IBBjAuMTAuNZgBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=-jZzZZTUKqK1juMPobWusAQ&bih=642&biw=1280#imgrc=pqHB1ZDbcriEFM',
        adminId: 1, 
        waitersId: 1, 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        item_name: 'Caesar Salad',
        price: 48.000,
        image: 'https://www.healthyseasonalrecipes.com/creamy-classic-caesar-salad-dressing/',
        adminId: 1, 
        waitersId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        item_name: 'Beef Burger',
        price: 46.000,
        image: 'https://www.google.com/search?q=Beef+Burger&tbm=isch&ved=2ahUKEwiYqpj7lYCDAxUncWwGHRTJDccQ2-cCegQIABAA&oq=Beef+Burger&gs_lcp=CgNpbWcQAzIICAAQgAQQsQMyCggAEIAEEIoFEEMyBQgAEIAEMgUIABCABDIKCAAQgAQQigUQQzIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEUABYAGD8BWgAcAB4AIABtwKIAbcCkgEDMy0xmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=ZzhzZdjaEafiseMPlJK3uAw&bih=642&biw=1280#imgrc=SUmo-455zYijQM',
        adminId: 1, 
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
    await queryInterface.bulkDelete('Menus', null, {});
  }
};
