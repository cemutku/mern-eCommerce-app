import express from 'express';
import {
	getProducts,
	getProductById,
	deleteProduct,
} from '../controllers/product-controller.js';
import { protect, isAdmin } from '../middleware/auth-middleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router
	.route('/:id')
	.get(getProductById)
	.delete(protect, isAdmin, deleteProduct);

export default router;
