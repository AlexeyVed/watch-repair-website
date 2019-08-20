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

workersRouter.use('/list', list)
workersRouter.use('/add', isAuthenticate, addValidation, add)
workersRouter.use('/delete', isAuthenticate, removeValidation, remove)
workersRouter.use('/update', isAuthenticate, updateValidation, update)
workersRouter.use('/get', isAuthenticate, getValidation, get)

module.exports = workersRouter
