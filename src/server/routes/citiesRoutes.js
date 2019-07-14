const express = require('express')
const citiesController = require('../controllers/citiesController.js')
const citiesRouter = express.Router()

citiesRouter.use('/getAll', citiesController.getCities)

module.exports = citiesRouter
