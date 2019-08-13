const express = require('express')
const workersController = require('../controllers/mastersController.js')
const isAuthenticate = require('../config/middleware/isAuthenticate.js')
const workersRouter = express.Router()

workersRouter.use('/list', workersController.list)
workersRouter.use('/add', isAuthenticate, workersController.add)
workersRouter.use('/delete', isAuthenticate, workersController.delete)
workersRouter.use('/update', isAuthenticate, workersController.update)
workersRouter.use('/get', isAuthenticate, workersController.get)

module.exports = workersRouter
