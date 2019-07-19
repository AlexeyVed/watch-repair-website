const express = require('express')
const citiesController = require('../controllers/citiesController.js')
const citiesRouter = express.Router()

citiesRouter.use('/getAll', citiesController.getCities)
citiesRouter.use('/addCity', citiesController.addCity)
citiesRouter.use('/deleteCity', citiesController.deleteCity)
citiesRouter.use('/updateCity', citiesController.updateCity)

module.exports = citiesRouter
