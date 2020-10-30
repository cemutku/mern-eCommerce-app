## MERN eCommerce Backend

Backend API is created with express and MongoDB.

API routes are created with express and you can find them in the `../backend/routes/` directory. Each entity has its own route file for handling incoming requests.

Each entity has its own controller file which is located in `../backend/controllers/` and they are consumed by the respective routes.

Mongoose package is used for object modeling and interacting with MongoDB.

## Usage

After the installation of npm packages which is described in the README of root directory. Use the command below for starting backend side of the project.

```bash
npm start
```

After starting backend API, check the products route from http://localhost:5000/api/products to see if the data is retrieving correctly.
