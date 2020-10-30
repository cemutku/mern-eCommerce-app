# MERN eCommerce App

This project is developed with MERN (MongoDB - Express - React - Node) stack. It was developed with the guidance of the [Udemy](https://www.udemy.com/course/mern-ecommerce/) course. I changed the payment method from PayPal to Stripe.

## Installation

For both backend and frontend side of the project:

After cloning the project, use the command below for the necessary npm packages for **backend**. You must execute the command in the project root directory ().

```bash
...\mern-eCommerce-app> npm install
```

Run the same `npm install` command in the **frontend** directory of the project.

```bash
...\mern-eCommerce-app\frontend> npm install
```

## Usage

You can find the backend and frontend usage steps below:

### Backend

Before using the API, you must set the MONGO_URI value in the .env file. Change the name of the ".env_sample" to ".env" then add your environment variables to this file.

Run the `npm start` in the root directory and go check the http://localhost:5000/ for backend API.

You must be seeing the "API is running" message on the browser then you can also test it from application like Postman.

### Frontend

`concurrently` package is used for running backend and frontend at the same time. Run the command below for starting up the project.

```bash
...\mern-eCommerce-app> npm run dev
```

Then check http://localhost:3000/ address for the home page of the project.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
