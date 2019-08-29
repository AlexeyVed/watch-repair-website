const express = require('express')
const customersController = require('../controllers/customerController.js')
const isAuthenticate = require('../modules/middleware/isAuthenticate.js')
const customersRouter = express.Router()

const {
  list,
  removeValidation, remove,
  addValidation, add,
  updateValidation, update,
  getValidation, get
} = customersController

customersRouter.get('/', isAuthenticate, list)
customersRouter.get('/:id', isAuthenticate, getValidation, get)
customersRouter.delete('/:id', isAuthenticate, removeValidation, remove)
customersRouter.post('/', isAuthenticate, addValidation, add)
customersRouter.put('/:id', isAuthenticate, updateValidation, update)

module.exports = customersRouter
