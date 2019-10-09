const express = require('express')
const customersController = require('../controllers/usersController.js')
const isAuthenticate = require('../modules/middleware/isAuthenticate.js')

const customersRouter = express.Router()

const { loginValidation, login, logout, checkAuth } = customersController

customersRouter.use('/login', loginValidation, login)
customersRouter.use('/authAdmin', isAuthenticate, checkAuth)
customersRouter.use('/logout', logout)

module.exports = customersRouter
