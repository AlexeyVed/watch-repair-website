const express = require('express')
const passport = require('passport')
const customersController = require('../controllers/usersController.js')
const customersRouter = express.Router()

customersRouter.use('/login', passport.authenticate('local'), customersController.login)

module.exports = customersRouter
