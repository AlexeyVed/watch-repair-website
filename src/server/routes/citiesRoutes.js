const express = require('express')
const citiesController = require('../controllers/citiesController.js')
const citiesRouter = express.Router()

citiesRouter.use('/list', citiesController.list)
citiesRouter.use('/add', citiesController.add)
citiesRouter.use('/delete', citiesController.delete)
citiesRouter.use('/update', citiesController.update)

module.exports = citiesRouter
