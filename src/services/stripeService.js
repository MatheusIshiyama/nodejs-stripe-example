const Stripe = require('stripe');
const StripeEvents = require('../events/stripeEvents');

const stripe = Stripe(process.env.STRIPE_KEY);

const stripeEvents = new StripeEvents();

class StripeService {
  handleWebhook(req, res) {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    try {
      // Verify that the event was sent by Stripe
      const event = stripe.webhooks.constructEvent(req['rawBody'], sig, endpointSecret);

      // Handle the event (e.g., payment success, refund, etc.)
      stripeEvents.handleEvent(event);

      res.json({ received: true });
    } catch (err) {
      console.log('Webhook signature verification failed.', { err });
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  }

  async createCheckoutSession(purchase) {
    const { id, productName, price, currency } = purchase;

    try {
      const session = await stripe.checkout.sessions.create({
        client_reference_id: id,
        mode: 'payment',
        customer_email: 'test@test.com',
        line_items: [
          {
            price_data: {
              currency,
              unit_amount: price,
              product_data: {
                name: productName,
              },
            },
            quantity: 1,
          },
        ],
        success_url: 'http://localhost:3000/payment/callback',
      });

      return session;
    } catch (error) {
      console.log('Create session error.', { error });
      throw error;
    }
  }
}

module.exports = StripeService;
