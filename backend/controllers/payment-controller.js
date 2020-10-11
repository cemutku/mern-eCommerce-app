import asyncHandler from 'express-async-handler';
import stripe from 'stripe';

// @description     Get stripe secret
// @route           POST /api/orders/config/stripe-sk
// @access          Private
const getStripeSecret = asyncHandler(async (req, res) => {
	try {
		const paymentIntent = await stripe(
			process.env.STRIPE_TEST_SECRET
		).paymentIntents.create({
			amount: req.body.amount,
			currency: req.body.currency,
			metadata: { integration_check: 'accept_a_payment' },
		});

		res.json({ client_secret: paymentIntent.client_secret });
	} catch (error) {
		console.log(error);
		res.status(500);
		throw new Error('Cannot connect stripe!');
	}
});

// @description     Get stripe pk
// @route           GET /api/orders/config/stripe-pk
// @access          Private
const getStripePublicKey = asyncHandler(async (req, res) => {
	try {
		res.json({ public_key: process.env.STRIPE_TEST_PUBLIC_KEY });
	} catch (error) {
		console.log(error);
		res.status(500);
		throw new Error('Cannot get stripe pk!');
	}
});

export { getStripeSecret, getStripePublicKey };
