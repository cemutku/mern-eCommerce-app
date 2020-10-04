import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDb from './config/db.js';
import productRoutes from './routes/product-routes.js';
import { notFound, errorHandler } from './middleware/error-middleware.js';

// define environment variables
dotenv.config();

// start connection
connectDb();

// create api server
const app = express();

app.get('/', (req, res) => {
  res.send('API is runninmg');
});

app.use('/api/products', productRoutes);

// not found middleware
app.use(notFound);

// custom error middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
