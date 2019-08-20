const express = require('express')
const customersController = require('../controllers/customerController.js')
const isAuthenticate = require('../config/middleware/isAuthenticate.js')
const customersRouter = express.Router()

const {
  list,
  removeValidation, remove,
  addValidation, add,
  updateValidation, update,
  getValidation, get
} = customersController

customersRouter.use('/list', isAuthenticate, list)
customersRouter.use('/delete', isAuthenticate, removeValidation, remove)
customersRouter.use('/add', isAuthenticate, addValidation, add)
customersRouter.use('/update', isAuthenticate, updateValidation, update)
customersRouter.use('/get', isAuthenticate, getValidation, get)

module.exports = customersRouter
