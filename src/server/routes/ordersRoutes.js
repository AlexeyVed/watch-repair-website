const express = require('express')
const ordersController = require('../controllers/ordersController.js')
const ordersRouter = express.Router()

ordersRouter.use('/getAll', ordersController.getOrders)
ordersRouter.use('/makeOrder', ordersController.makeOrder)
ordersRouter.use('/addOrder', ordersController.addOrder)
ordersRouter.use('/deleteOrder', ordersController.deleteOrder)
ordersRouter.use('/updateOrder', ordersController.updateOrder)
ordersRouter.use('/addOrderAdmin', ordersController.addOrderAdmin)

module.exports = ordersRouter
