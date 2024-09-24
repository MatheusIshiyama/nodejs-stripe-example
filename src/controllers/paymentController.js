const PurchaseService = require('../services/purchaseService');
const StripeService = require('../services/stripeService');

const purchaseService = new PurchaseService();
const stripeService = new StripeService();

class PaymentController {
  async createAndRedirectToPayment(req, res) {
    let purchase;

    try {
      const price = 1999; // ? R$ 19.99

      purchase = await purchaseService.create('product', price);

      if (!purchase) return res.sendStatus(500);

      const checkoutSession = await stripeService.createCheckoutSession(purchase);

      if (!checkoutSession.url) return res.sendStatus(500);

      await purchaseService.update(purchase.id, { paymentUrl: checkoutSession.url });

      return res.redirect(checkoutSession.url);
    } catch (error) {
      console.log('Failed to createAndRedirectPayment', { error });

      if (purchase) await purchaseService.deleteById(purchase.id);
    }
  }
}

module.exports = PaymentController;
