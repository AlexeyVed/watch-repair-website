const express = require('express')
const clocksController = require('../controllers/clocksController.js')
const isAuthenticate = require('../config/jwt.js').isAuthenticate
const clocksRouter = express.Router()

clocksRouter.use('/list', clocksController.list)
clocksRouter.use('/add', isAuthenticate, clocksController.add)
clocksRouter.use('/delete', isAuthenticate, clocksController.delete)
clocksRouter.use('/update', isAuthenticate, clocksController.update)
clocksRouter.use('/get', isAuthenticate, clocksController.get)

module.exports = clocksRouter
