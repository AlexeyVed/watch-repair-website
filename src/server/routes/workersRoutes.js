const express = require('express')
const workersController = require('../controllers/workersController.js')
const workersRouter = express.Router()

workersRouter.use('/getAll', workersController.getWorkers)
workersRouter.use('/addWorker', workersController.addWorker)
workersRouter.use('/deleteWorker', workersController.deleteWorker)
workersRouter.use('/updateWorker', workersController.updateWorker)

module.exports = workersRouter