const express = require('express')
const customersController = require('../controllers/usersController.js')

const customersRouter = express.Router()

const { loginValidation, login, logout } = customersController

customersRouter.use('/login', loginValidation, login)
customersRouter.use('/logout', logout)

module.exports = customersRouter
