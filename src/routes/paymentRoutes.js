const { Router } = require('express');
const PaymentController = require('../controllers/paymentController');

const router = Router();

const paymentController = new PaymentController();

router.get('/payment', paymentController.createAndRedirectToPayment);

router.get('/payment/callback', (req, res) => res.status(200).json({ message: 'Returned from payment page' }));

const paymentRoutes = (app) => app.use('/', router);

module.exports = { paymentRoutes };
