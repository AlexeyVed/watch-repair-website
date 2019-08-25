const { check, validationResult } = require('express-validator')
const error = require('../services/modules.js').makeError
const City = require('../models/cities.js')

exports.list = function (req, res, next) {
  City.findAll({
    order: [ ['city', 'ASC'] ]
  })
    .then(cities => {
      res.json(cities)
    })
    .catch(err => {
      next(error(400, 'Error get list of cities'))
    })
}

exports.getValidation = [
  check('id').isNumeric().not().isEmpty()
]

exports.get = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  City.findByPk(req.body.id)
    .then(city => {
      res.json(city)
    })
    .catch(err => {
      next(error(400, 'Error get city.'))
    })
}

exports.addValidation = [
  check('city').isAlpha().not().isEmpty()
]

exports.add = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  City.create({ city: req.body.city })
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      next(error(400, 'Error add city'))
    })
}

exports.removeValidation = [
  check('id').isNumeric().not().isEmpty()
]

exports.remove = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  City.destroy({
    where: { id: req.body.id }
  })
    .then(result => {
      res.json(req.body)
    })
    .catch(err => {
      next(error(400, 'Error delete city'))
    })
}

exports.updateValidation = [
  check('city').isAlpha().not().isEmpty(),
  check('id').isNumeric().not().isEmpty()
]

exports.update = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  City.update({
    city: req.body.city }, {
    where: { id: req.body.id }
  })
    .then((result) => {
      return City.findByPk(req.body.id)
    })
    .then(city => {
      res.json(city)
    })
    .catch(err => {
      next(error(400, 'Error update city'))
    })
}
