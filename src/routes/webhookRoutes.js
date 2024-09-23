const { Router, raw } = require('express');
const StripeService = require('../services/stripeService');

const router = Router();

const stripeService = new StripeService();

router.post('/webhook', stripeService.handleWebhook);

const webhookRoutes = (app) => app.use('/', router);

module.exports = { webhookRoutes };
