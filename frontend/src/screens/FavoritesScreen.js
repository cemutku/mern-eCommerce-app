import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { getFavorites, removeFavorite } from '../actions/user-actions';

const FavoritesScreen = ({ match }) => {
	const dispatch = useDispatch();

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const userFavorites = useSelector((state) => state.userGetFavorites);
	const { favorites, loading, error } = userFavorites;

	const userRemoveFavorite = useSelector((state) => state.userRemoveFavorite);
	const {
		loading: removeFavoriteLoading,
		success: successRemoveFavorite,
		error: errorRemoveFavorite,
	} = userRemoveFavorite;

	useEffect(() => {
		dispatch(getFavorites(userInfo._id));
	}, [dispatch, userInfo, successRemoveFavorite]);

	const removeFromFavoritesHandler = (productId) => {
		dispatch(removeFavorite(productId, userInfo._id));
	};
	return (
		<>
			<Meta title='Favorites' />
			{favorites && favorites.length > 0 ? (
				<h1>Favorites</h1>
			) : (
				<>
					<h1>YOU HAVE NO FAVORITE PRODUCTS</h1>
					<Link to='/' className='btn btn-light'>
						Go Products
					</Link>
				</>
			)}

			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						{favorites.map((product) => (
							<Col key={product.product} sm={12} md={6} lg={4} xl={3}>
								{removeFavoriteLoading ? (
									<Loader />
								) : errorRemoveFavorite ? (
									<Message variant='danger'>{errorRemoveFavorite}</Message>
								) : (
									<Product
										product={product}
										isFavorite={true}
										removeFromFavorites={removeFromFavoritesHandler}
									/>
								)}
							</Col>
						))}
					</Row>
				</>
			)}
		</>
	);
};

export default FavoritesScreen;
