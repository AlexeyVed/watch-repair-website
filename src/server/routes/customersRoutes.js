const express = require('express')
const customersController = require('../controllers/customerController.js')
const isAuthenticate = require('../config/middleware/isAuthenticated.js')
const customersRouter = express.Router()

customersRouter.use('/list', isAuthenticate, customersController.list)
customersRouter.use('/delete', isAuthenticate, customersController.delete)
customersRouter.use('/add', isAuthenticate, customersController.add)
customersRouter.use('/update', isAuthenticate, customersController.update)
customersRouter.use('/get', isAuthenticate, customersController.get)

module.exports = customersRouter
