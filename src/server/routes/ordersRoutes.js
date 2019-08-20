const express = require('express')
const ordersController = require('../controllers/ordersController.js')
const isAuthenticate = require('../config/middleware/isAuthenticate.js')
const ordersRouter = express.Router()

const {
  list,
  getWorkersValidation, getWorkers,
  addValidation, add,
  removeValidation, remove,
  updateValidation, update,
  addAdminValidation, addAdmin,
  getValidation, get
} = ordersController

ordersRouter.use('/list', isAuthenticate, list)
ordersRouter.use('/getWorkers', getWorkersValidation, getWorkers)
ordersRouter.use('/add', addValidation, add)
ordersRouter.use('/delete', isAuthenticate, removeValidation, remove)
ordersRouter.use('/update', isAuthenticate, updateValidation, update)
ordersRouter.use('/addAdmin', isAuthenticate, addAdminValidation, addAdmin)
ordersRouter.use('/get', isAuthenticate, getValidation, get)

module.exports = ordersRouter
