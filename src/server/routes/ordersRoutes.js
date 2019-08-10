const express = require('express')
const ordersController = require('../controllers/ordersController.js')
const isAuthenticate = require('../config/middleware/isAuthenticated.js')
const ordersRouter = express.Router()

ordersRouter.use('/list', isAuthenticate, ordersController.list)
ordersRouter.use('/getWorkers', ordersController.getWorkers)
ordersRouter.use('/add', ordersController.add)
ordersRouter.use('/delete', isAuthenticate, ordersController.delete)
ordersRouter.use('/update', isAuthenticate, ordersController.update)
ordersRouter.use('/addAdmin', isAuthenticate, ordersController.addAdmin)
ordersRouter.use('/get', isAuthenticate, ordersController.get)

module.exports = ordersRouter
