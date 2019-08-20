const express = require('express')
const clocksController = require('../controllers/clocksController.js')
const isAuthenticate = require('../config/middleware/isAuthenticate.js')
const clocksRouter = express.Router()

const {
  list,
  addValidation, add,
  removeValidation, remove,
  updateValidation, update,
  getValidation, get
} = clocksController

clocksRouter.use('/list', list)
clocksRouter.use('/add', isAuthenticate, addValidation, add)
clocksRouter.use('/delete', isAuthenticate, removeValidation, remove)
clocksRouter.use('/update', isAuthenticate, updateValidation, update)
clocksRouter.use('/get', isAuthenticate, getValidation, get)

module.exports = clocksRouter
