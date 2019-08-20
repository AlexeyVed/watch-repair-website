const express = require('express')
const workersController = require('../controllers/mastersController.js')
const isAuthenticate = require('../config/middleware/isAuthenticate.js')
const workersRouter = express.Router()

const { list, add, remove, update, get } = workersController

workersRouter.use('/list', list)
workersRouter.use('/add', isAuthenticate, add)
workersRouter.use('/delete', isAuthenticate, remove)
workersRouter.use('/update', isAuthenticate, update)
workersRouter.use('/get', isAuthenticate, get)

module.exports = workersRouter
