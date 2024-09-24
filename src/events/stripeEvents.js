const PurchaseService = require('../services/purchaseService');

const eventListener = new Map();

const purchaseService = new PurchaseService();

class StripeEvents {
  constructor() {
    this.setup();
  }

  setup() {
    this.setEvents();
  }

  setEvents() {
    // eventListener.set('payment_intent.succeeded', this.paymentIntentSucceeded);
    eventListener.set('checkout.session.completed', this.checkoutSessionCompleted);
  }

  handleEvent(event) {
    const eventListenerExists = eventListener.has(event.type);

    if (!eventListenerExists) return console.log(`${event.type} is not listed in event listener`);

    const eventFunction = eventListener.get(event.type);

    return eventFunction(event);
  }

  paymentIntentSucceeded(event) {
    const paymentIntent = event.data.object;
    console.log('PaymentIntent was successful!', paymentIntent);
  }

  async checkoutSessionCompleted(event) {
    try {
      const checkoutSession = event.data.object;

      const purchaseId = checkoutSession.client_reference_id;
      const body = { paymentStatus: checkoutSession.payment_status };

      await purchaseService.update(purchaseId, body);

      console.log('checkoutSession was completed!', checkoutSession);
    } catch (error) {
      console.log('checkoutSessionCompleted error:', error);
      throw error;
    }
  }
}

module.exports = StripeEvents;
