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

citiesRouter.get('/', list)
citiesRouter.get('/?id', isAuthenticate, getValidation, get)
citiesRouter.post('/', isAuthenticate, addValidation, add)
citiesRouter.delete('/?id', isAuthenticate, removeValidation, remove)
citiesRouter.put('/?id', isAuthenticate, updateValidation, update)

module.exports = citiesRouter
