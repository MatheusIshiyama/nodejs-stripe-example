const Stripe = require('stripe');

const stripe = Stripe(process.env.STRIPE_KEY);
const eventListener = new Map();

const handleEvent = (event) => {
  const eventListenerExists = eventListener.has(event.type);

  if (!eventListenerExists) return console.log(`${event.type} is not listed in event listener`);

  const eventFunction = eventListener.get(event.type);

  return eventFunction(event);
};

class StripeService {
  constructor() {
    this.setup();
  }

  setup() {
    this.setEvents();
  }

  setEvents() {
    eventListener.set('payment_intent.succeeded', this.paymentIntentSucceeded);
  }

  handleWebhook(req, res) {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
      // Verify that the event was sent by Stripe
      const event = stripe.webhooks.constructEvent(req['rawBody'], sig, endpointSecret);

      // Handle the event (e.g., payment success, refund, etc.)
      handleEvent(event);

      res.json({ received: true });
    } catch (err) {
      console.log('Webhook signature verification failed.', { err });
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }

  paymentIntentSucceeded(event) {
    const paymentIntent = event.data.object;
    console.log('PaymentIntent was successful!', paymentIntent);
  }
}

module.exports = StripeService;
