const express = require('express')
const workersController = require('../controllers/workersController.js')
const workersRouter = express.Router()

workersRouter.use('/getAll', workersController.getWorkers)

module.exports = workersRouter
