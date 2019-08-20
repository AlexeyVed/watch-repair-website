const express = require('express')
const citiesController = require('../controllers/citiesController.js')
const isAuthenticate = require('../config/middleware/isAuthenticate.js')
const citiesRouter = express.Router()

const {
  list,
  addValidation, add,
  removeValidation, remove,
  updateValidation, update,
  getValidation, get
} = citiesController

citiesRouter.use('/list', list)
citiesRouter.use('/add', isAuthenticate, addValidation, add)
citiesRouter.use('/delete', isAuthenticate, removeValidation, remove)
citiesRouter.use('/update', isAuthenticate, updateValidation, update)
citiesRouter.use('/get', isAuthenticate, getValidation, get)

module.exports = citiesRouter
