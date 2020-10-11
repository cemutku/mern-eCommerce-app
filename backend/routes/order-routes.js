import express from 'express';
import {
	addOrderItems,
	getOrderById,
} from '../controllers/order-controller.js';
import { protect } from '../middleware/auth-middleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);

export default router;
