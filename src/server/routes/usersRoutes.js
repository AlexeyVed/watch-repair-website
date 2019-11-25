const express = require('express')
const customersController = require('../controllers/usersController.js')
const isAuthenticate = require('../modules/middleware/isAuthenticate.js')

const customersRouter = express.Router()

const { loginValidation, login, logout, checkAuth } = customersController

customersRouter.post('/login', loginValidation, login)
customersRouter.use('/authAdmin', isAuthenticate, checkAuth)
customersRouter.get('/logout', logout)

module.exports = customersRouter
