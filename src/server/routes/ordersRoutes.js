const express = require('express')
const ordersController = require('../controllers/ordersController.js')
const isAuthenticate = require('../modules/middleware/isAuthenticate.js')
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

ordersRouter.get('/', isAuthenticate, list)
ordersRouter.get('/:id', isAuthenticate, getValidation, get)
ordersRouter.post('/freeMasters', getWorkersValidation, getWorkers)
ordersRouter.post('/', addValidation, add)
ordersRouter.post('/admin', isAuthenticate, addAdminValidation, addAdmin)
ordersRouter.delete('/:id', isAuthenticate, removeValidation, remove)
ordersRouter.put('/:id', isAuthenticate, updateValidation, update)

module.exports = ordersRouter
