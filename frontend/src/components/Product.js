import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import Rating from './Rating';

const Product = ({ product, isFavorite, removeFromFavorites }) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/product/${isFavorite ? product.product : product._id}`}>
				<Card.Img src={product.image} variant='top' />
			</Link>
			<Card.Body>
				<Link to={`/product/${isFavorite ? product.product : product._id}`}>
					<Card.Title as='div'>
						<strong>{product.name}</strong>
					</Card.Title>
				</Link>
				<Card.Text as='div'>
					<Rating
						value={product.rating}
						text={`${product.numReviews} reviews`}
					/>
				</Card.Text>
				<Card.Text as='h3'>${product.price}</Card.Text>
			</Card.Body>
			{product.product && (
				<Button
					type='button'
					variant='light'
					onClick={() => removeFromFavorites(product.product)}
				>
					<i className='fas fa-trash fa-2x'></i>
				</Button>
			)}
		</Card>
	);
};

export default Product;
