const express = require('express')
const combinationController = require('../controllers/combinationController.js')
const combinationRouter = express.Router()

combinationRouter.use('/getAll', combinationController.getDataAdmin)
combinationRouter.use('/getData', combinationController.getData)

module.exports = combinationRouter
