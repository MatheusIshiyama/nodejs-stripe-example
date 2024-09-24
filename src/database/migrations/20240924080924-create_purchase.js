'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purchases', {
      id: {
        field: 'id',
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      productName: {
        field: 'product_name',
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
        field: 'price',
        type: Sequelize.NUMBER,
        allowNull: false,
      },
      currency: {
        field: 'currency',
        type: Sequelize.NUMBER,
        defaultValue: 'BRL',
        allowNull: false,
      },
      paymentStatus: {
        field: 'payment_status',
        type: Sequelize.STRING,
        defaultValue: 'pending',
        allowNull: false,
      },
      paymentUrl: {
        field: 'payment_url',
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('purchases');
  },
};
