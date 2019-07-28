const express = require('express')
const combinationController = require('../controllers/combinationController.js')
const combinationRouter = express.Router()

combinationRouter.use('/listAdmin', combinationController.listAdmin)
combinationRouter.use('/list', combinationController.list)

module.exports = combinationRouter
