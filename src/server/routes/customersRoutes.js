const express = require('express')
const customersController = require('../controllers/customerController.js')
const customersRouter = express.Router()

customersRouter.use('/list', customersController.list)
customersRouter.use('/login', customersController.login)
customersRouter.use('/registration', customersController.registration)
customersRouter.use('/add', customersController.add)
customersRouter.use('/delete', customersController.delete)
customersRouter.use('/update', customersController.update)
customersRouter.use('/get', customersController.get)

module.exports = customersRouter
