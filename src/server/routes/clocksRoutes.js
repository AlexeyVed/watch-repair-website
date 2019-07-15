const express = require('express')
const clocksController = require('../controllers/clocksController.js')
const clocksRouter = express.Router()

clocksRouter.use('/getAll', clocksController.getClocks)
clocksRouter.use('/addClock', clocksController.addClock)
clocksRouter.use('/deleteClock', clocksController.deleteClock)

module.exports = clocksRouter
