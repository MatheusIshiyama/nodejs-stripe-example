const { Sequelize, DataTypes } = require('sequelize');

/**
 * @param {Sequelize} sequelize
 * @param {DataTypes} dataTypes
 */
module.exports = (sequelize, dataTypes) => {
  return sequelize.define(
    'Purchase',
    {
      id: {
        field: 'id',
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      productName: {
        field: 'product_name',
        type: dataTypes.STRING,
        allowNull: false,
      },
      price: {
        field: 'price',
        type: dataTypes.NUMBER,
        allowNull: false,
      },
      currency: {
        field: 'currency',
        type: dataTypes.NUMBER,
        defaultValue: 'BRL',
        allowNull: false,
      },
      paymentStatus: {
        field: 'payment_status',
        type: dataTypes.STRING,
        defaultValue: 'pending',
        allowNull: false,
      },
      paymentUrl: {
        field: 'payment_url',
        type: dataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        field: 'created_at',
        type: dataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: 'updated_at',
        type: dataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: 'purchases',
    }
  );
};
