import express from 'express';
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	getMyOrders,
	getOrders,
} from '../controllers/order-controller.js';
import { protect, isAdmin } from '../middleware/auth-middleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems).get(protect, isAdmin, getOrders);
router.route('/myorders').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, isAdmin, updateOrderToDelivered);

export default router;
