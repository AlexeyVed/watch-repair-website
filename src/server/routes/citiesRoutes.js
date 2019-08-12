const express = require('express')
const citiesController = require('../controllers/citiesController.js')
const isAuthenticate = require('../config/jwt.js').isAuthenticate
const citiesRouter = express.Router()

citiesRouter.use('/list', citiesController.list)
citiesRouter.use('/add', isAuthenticate, citiesController.add)
citiesRouter.use('/delete', isAuthenticate, citiesController.delete)
citiesRouter.use('/update', isAuthenticate, citiesController.update)
citiesRouter.use('/get', isAuthenticate, citiesController.get)

module.exports = citiesRouter
