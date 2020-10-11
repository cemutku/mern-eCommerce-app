import React, { useEffect, useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import Message from '../components/Message';
import Loader from '../components/Loader';

const CARD_ELEMENT_OPTIONS = {
	style: {
		base: {
			color: '#32325d',
			fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
			fontSmoothing: 'antialiased',
			fontSize: '16px',
			'::placeholder': {
				color: '#aab7c4',
			},
		},
		invalid: {
			color: '#fa755a',
			iconColor: '#fa755a',
		},
	},
};

const CheckoutForm = ({ totalPrice, paymentHandler }) => {
	const [clientSecret, setClientSecret] = useState(null);
	const [processing, setProcessing] = useState(false);
	const [error, setError] = useState(null);
	const [disabled, setDisabled] = useState(true);
	const [succeeded, setSucceeded] = useState(false);
	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		const createPaymentIntent = async () => {
			const { data } = await axios.post(
				'/api/payments/config/stripe-payment-intent',
				{
					amount: totalPrice.toFixed(0),
					currency: 'usd',
				}
			);

			setClientSecret(data.client_secret);
		};

		createPaymentIntent();
	}, []);

	const handleChange = async (event) => {
		// Listen for changes in the CardElement
		// and display any errors as the customer types their card details
		setDisabled(event.empty);
		setError(event.error ? event.error.message : '');
	};

	const handleSubmit = async (event) => {
		// We don't want to let default form submission happen here,
		// which would refresh the page.
		event.preventDefault();
		setProcessing(true);

		if (!stripe || !elements) {
			// Stripe.js has not yet loaded.
			// Make sure to disable form submission until Stripe.js has loaded.
			return;
		}

		const result = await stripe.confirmCardPayment(clientSecret, {
			payment_method: {
				card: elements.getElement(CardElement),
				billing_details: {
					name: 'John Doe',
				},
			},
		});

		if (result.error) {
			setError(`Payment failed ${result.error.message}`);
			console.log(result.error.message);
			setProcessing(false);
		} else {
			setError(null);
			setProcessing(false);
			setSucceeded(true);

			if (result.paymentIntent.status === 'succeeded') {
				console.log('[PaymentIntent]', result.paymentIntent);
				paymentHandler(result.paymentIntent);

				// TODO:
				// There's a risk of the customer closing the window before callback
				// execution. Set up a webhook or plugin to listen for the
				// payment_intent.succeeded event that handles any business critical
				// post-payment actions.
			}
		}
	};

	return (
		<>
			{processing && <Loader />}
			{error && <Message variant='danger'>{error}</Message>}
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>Card Details: </Form.Label>
					<Col>
						<CardElement
							options={CARD_ELEMENT_OPTIONS}
							onChange={handleChange}
						/>
					</Col>
				</Form.Group>
				<Button
					type='submit'
					variant='primary'
					className='btn-block'
					disabled={!stripe || disabled || succeeded || processing}
				>
					Proceed To Checkout
				</Button>
			</Form>
		</>
	);
};

export default CheckoutForm;
