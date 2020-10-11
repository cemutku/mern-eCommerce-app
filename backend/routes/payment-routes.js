import express from 'express';
import {
	getStripeSecret,
	getStripePublicKey,
} from '../controllers/payment-controller.js';
import { protect } from '../middleware/auth-middleware.js';

const router = express.Router();

router.route('/config/stripe-pk').get(getStripePublicKey);
router.route('/config/stripe-payment-intent').post(getStripeSecret);

export default router;
