import express from 'express';
import {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
	addFavoriteProduct,
	removeFavoriteProduct,
	getFavoriteProducts,
} from '../controllers/user-controller.js';
import { protect, isAdmin } from '../middleware/auth-middleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);
router.post('/login', authUser);
router
	.route('/profile')
	.get(protect, getUserProfile)
	.put(protect, updateUserProfile);
router
	.route('/:id')
	.delete(protect, isAdmin, deleteUser)
	.get(protect, isAdmin, getUserById)
	.put(protect, isAdmin, updateUser);

router
	.route('/:id/favorites')
	.get(protect, getFavoriteProducts)
	.post(protect, addFavoriteProduct);
router
	.route('/:id/favorites/:productId')
	.delete(protect, removeFavoriteProduct);

export default router;
