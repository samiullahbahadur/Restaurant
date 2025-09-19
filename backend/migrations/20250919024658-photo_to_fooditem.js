"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("FoodItem", "photo", {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("FoodItem", "photo");
  },
};
