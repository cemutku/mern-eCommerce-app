## MERN eCommerce Frontend

Frontend was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the frontend directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

After build process, if the `NODE_ENV` value in the .env file has the "production" value then, frontend build folder will be set as a static folder for backend side.

Code sample from `.../backend/server.js`

```
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')));

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
	);
}
```
