const express = require('express')
const customersController = require('../controllers/usersController.js')

const customersRouter = express.Router()

const { loginValidation, login, logout } = customersController

customersRouter.post('/login', loginValidation, login)
customersRouter.get('/logout', logout)

module.exports = customersRouter
