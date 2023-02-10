require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const smartApp = require('./smartapp')
const PORT = 3000

// Configure the Express web server
const server = express()
server.use(express.json())
server.use(morgan('dev'))

// Set up the SmartApp route
server.post('/', async (req, res, next) => {
	try {
		await smartApp.handleHttpCallback(req, res);
	} catch (e) {
		next(e)
	}
})

server.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));
