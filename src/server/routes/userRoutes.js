const express = require('express')
const usersController = require('../controllers/userController.js')
const usersRouter = express.Router()

usersRouter.use('/getAll', usersController.getUsers)
usersRouter.use('/login', usersController.login)
usersRouter.use('/registration', usersController.registration)

module.exports = usersRouter
