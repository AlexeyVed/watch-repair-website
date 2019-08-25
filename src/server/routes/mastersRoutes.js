const express = require('express')
const workersController = require('../controllers/mastersController.js')
const isAuthenticate = require('../config/middleware/isAuthenticate.js')
const workersRouter = express.Router()

const {
  list,
  addValidation, add,
  removeValidation, remove,
  updateValidation, update,
  getValidation, get
} = workersController

workersRouter.get('/', list)
workersRouter.get('/?id', isAuthenticate, getValidation, get)
workersRouter.post('/', isAuthenticate, addValidation, add)
workersRouter.delete('/?id', isAuthenticate, removeValidation, remove)
workersRouter.put('/?id', isAuthenticate, updateValidation, update)

module.exports = workersRouter
