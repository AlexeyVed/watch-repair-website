const express = require('express')
const ordersController = require('../controllers/ordersController.js')
const ordersRouter = express.Router()

ordersRouter.use('/list', ordersController.list)
ordersRouter.use('/getWorkers', ordersController.getWorkers)
ordersRouter.use('/add', ordersController.add)
ordersRouter.use('/delete', ordersController.delete)
ordersRouter.use('/update', ordersController.update)
ordersRouter.use('/addAdmin', ordersController.addAdmin)
ordersRouter.use('/get', ordersController.get)

module.exports = ordersRouter
