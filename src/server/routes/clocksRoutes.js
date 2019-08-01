const express = require('express')
const clocksController = require('../controllers/clocksController.js')
const clocksRouter = express.Router()

clocksRouter.use('/list', clocksController.list)
clocksRouter.use('/add', clocksController.add)
clocksRouter.use('/delete', clocksController.delete)
clocksRouter.use('/update', clocksController.update)
clocksRouter.use('/get', clocksController.get)

module.exports = clocksRouter
