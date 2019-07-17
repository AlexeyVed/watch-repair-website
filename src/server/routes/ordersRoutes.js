const express = require('express')
const ordersController = require('../controllers/ordersController.js')
const ordersRouter = express.Router()

ordersRouter.use('/getAll', ordersController.getOrders)
ordersRouter.use('/addOrder', ordersController.addOrder)

module.exports = ordersRouter
