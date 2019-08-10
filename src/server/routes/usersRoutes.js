const express = require('express')
const customersController = require('../controllers/usersController.js')

const customersRouter = express.Router()

customersRouter.use('/login', customersController.login)
customersRouter.use('/logout', customersController.logout)

module.exports = customersRouter
