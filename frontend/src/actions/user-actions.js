import axios from 'axios';
import {
	USER_DETAILS_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_RESET,
	USER_LOGIN_FAIL,
	USER_LOGIN_LOGOUT,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
	USER_UPDATE_PROFILE_FAIL,
	USER_UPDATE_PROFILE_REQUEST,
	USER_UPDATE_PROFILE_SUCCESS,
	USER_LIST_REQUEST,
	USER_LIST_SUCCESS,
	USER_LIST_FAIL,
	USER_LIST_RESET,
	USER_DELETE_REQUEST,
	USER_DELETE_SUCCESS,
	USER_DELETE_FAIL,
	USER_UPDATE_REQUEST,
	USER_UPDATE_SUCCESS,
	USER_UPDATE_FAIL,
	USER_ADD_FAVORITE_REQUEST,
	USER_ADD_FAVORITE_SUCCESS,
	USER_ADD_FAVORITE_FAIL,
	USER_REMOVE_FAVORITE_REQUEST,
	USER_REMOVE_FAVORITE_SUCCESS,
	USER_REMOVE_FAVORITE_FAIL,
	USER_GET_FAVORITES_REQUEST,
	USER_GET_FAVORITES_SUCCESS,
	USER_GET_FAVORITES_FAIL,
} from '../constants/user-constants';

import { ORDER_GET_MY_ORDERS_RESET } from '../constants/order-constants';

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_LOGIN_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/users/login',
			{ email, password },
			config
		);

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_LOGIN_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const logout = () => (dispatch) => {
	localStorage.removeItem('userInfo');
	dispatch({
		type: USER_LOGIN_LOGOUT,
	});
	dispatch({
		type: USER_DETAILS_RESET,
	});
	dispatch({
		type: ORDER_GET_MY_ORDERS_RESET,
	});
	dispatch({
		type: USER_LIST_RESET,
	});
};

export const register = (name, email, password) => async (dispatch) => {
	try {
		dispatch({
			type: USER_REGISTER_REQUEST,
		});

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.post(
			'/api/users',
			{ name, email, password },
			config
		);

		dispatch({
			type: USER_REGISTER_SUCCESS,
			payload: data,
		});

		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_REGISTER_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getUserDetails = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DETAILS_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/users/${id}`, config);

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_PROFILE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(`/api/users/profile`, user, config);

		dispatch({
			type: USER_UPDATE_PROFILE_SUCCESS,
			payload: data,
		});
		dispatch({
			type: USER_LOGIN_SUCCESS,
			payload: data,
		});

		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: USER_UPDATE_PROFILE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const listUsers = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_LIST_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/users`, config);

		dispatch({
			type: USER_LIST_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteUser = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_DELETE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/users/${id}`, config);

		dispatch({
			type: USER_DELETE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: USER_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const updateUser = (user) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_UPDATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.put(`/api/users/${user._id}`, user, config);

		dispatch({
			type: USER_UPDATE_SUCCESS,
		});
		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: USER_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const addToFavorites = (product, userId) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: USER_ADD_FAVORITE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(
			`/api/users/${userId}/favorites`,
			{
				productId: product._id,
				name: product.name,
				image: product.image,
				price: product.price,
				numReviews: product.numReviews,
				rating: product.rating,
			},
			config
		);

		dispatch({
			type: USER_ADD_FAVORITE_SUCCESS,
			payload: data.favorites,
		});
	} catch (error) {
		dispatch({
			type: USER_ADD_FAVORITE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const removeFavorite = (productId, userId) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({
			type: USER_REMOVE_FAVORITE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		await axios.delete(`/api/users/${userId}/favorites/${productId}`, config);

		dispatch({
			type: USER_REMOVE_FAVORITE_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: USER_REMOVE_FAVORITE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getFavorites = (userId) => async (dispatch, getState) => {
	try {
		dispatch({
			type: USER_GET_FAVORITES_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState();

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/users/${userId}/favorites`, config);

		dispatch({
			type: USER_GET_FAVORITES_SUCCESS,
			payload: data.favorites,
		});
	} catch (error) {
		dispatch({
			type: USER_GET_FAVORITES_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
