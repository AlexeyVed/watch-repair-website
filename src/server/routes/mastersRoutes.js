const express = require('express')
const workersController = require('../controllers/mastersController.js')
const workersRouter = express.Router()

workersRouter.use('/list', workersController.list)
workersRouter.use('/add', workersController.add)
workersRouter.use('/delete', workersController.delete)
workersRouter.use('/update', workersController.update)
workersRouter.use('/get', workersController.get)

module.exports = workersRouter
