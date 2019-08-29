const express = require('express')
const clocksController = require('../controllers/clocksController.js')
const isAuthenticate = require('../modules/middleware/isAuthenticate.js')
const clocksRouter = express.Router()

const {
  list,
  addValidation, add,
  removeValidation, remove,
  updateValidation, update,
  getValidation, get
} = clocksController

clocksRouter.get('/', list)
clocksRouter.get('/:id', isAuthenticate, getValidation, get)
clocksRouter.post('/', isAuthenticate, addValidation, add)
clocksRouter.delete('/:id', isAuthenticate, removeValidation, remove)
clocksRouter.put('/:id', isAuthenticate, updateValidation, update)

module.exports = clocksRouter
