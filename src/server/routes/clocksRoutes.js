const express = require('express')
const clocksController = require('../controllers/clocksController.js')
const clocksRouter = express.Router()

clocksRouter.use('/getAll', clocksController.getClocks)

module.exports = clocksRouter
