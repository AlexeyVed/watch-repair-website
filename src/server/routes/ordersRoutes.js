const express = require('express')
const ordersController = require('../controllers/ordersController.js')
const ordersRouter = express.Router()

ordersRouter.use('/getAll', ordersController.getOrders)
ordersRouter.use('/makeOrder', ordersController.makeOrder)
ordersRouter.use('/addOrder', ordersController.addOrder)
ordersRouter.use('/deleteOrder', ordersController.deleteOrder)

module.exports = ordersRouter
