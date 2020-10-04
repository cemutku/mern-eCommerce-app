import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/user-model.js';
import Product from './models/product-model.js';
import Order from './models/order-model.js';
import connectDb from './config/db.js';

dotenv.config();
connectDb();

const importData = async () => {
  try {
    // delete everything
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // import data
    const createdUsers = await User.insertMany(users);

    // first item is admin
    const adminUser = createdUsers[0]._id;

    // add relation between products and admin suer
    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });

    // insert products
    await Product.insertMany(sampleProducts);

    console.log('Data imported...'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // delete everything
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed...'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

// get command for operation
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
