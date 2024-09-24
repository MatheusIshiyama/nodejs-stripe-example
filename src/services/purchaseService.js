const { Purchase, sequelize } = require('../database');

class PurchaseService {
  async create(productName, price) {
    const transaction = await sequelize.transaction();

    try {
      const purchase = await Purchase.create({ productName, price }, { transaction });

      transaction.commit();

      return purchase;
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  async update(id, body) {
    const transaction = await sequelize.transaction();

    try {
      const query = { where: { id } };

      const updatedPurchase = await Purchase.update(body, query, { transaction });

      transaction.commit();

      return updatedPurchase;
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }

  async deleteById(id) {
    const transaction = await sequelize.transaction();

    try {
      await Purchase.delete({ where: { id } }, { transaction });

      transaction.commit();
    } catch (error) {
      transaction.rollback();
      throw error;
    }
  }
}

module.exports = PurchaseService;
