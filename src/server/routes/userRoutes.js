const express = require('express')
const usersController = require('../controllers/userController.js')
const usersRouter = express.Router()

usersRouter.use('/list', usersController.list)
usersRouter.use('/login', usersController.login)
usersRouter.use('/registration', usersController.registration)
usersRouter.use('/add', usersController.add)
usersRouter.use('/delete', usersController.delete)
usersRouter.use('/update', usersController.update)

module.exports = usersRouter
