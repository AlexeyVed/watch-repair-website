const { checkSchema, validationResult } = require('express-validator')
const error = require('../modules/services.js').makeError
const City = require('../models/cities.js')

exports.list = function (req, res, next) {
  City.findAll({
    order: [ ['city', 'ASC'] ]
  })
    .then(cities => {
      res.json(cities)
    })
    .catch(() => {
      next(error(400, 'Error get list of cities'))
    })
}

exports.getValidation = checkSchema({
  id: {
    in: ['params', 'query'],
    errorMessage: 'ID is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  }
})

exports.get = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  City.findByPk(req.params.id)
    .then(city => {
      if (city === null) {
        return next(error(404, `City with id = ${req.params.id} not found!`))
      }
      res.json(city)
    })
    .catch(() => {
      next(error(400, 'Error get city.'))
    })
}

exports.addValidation = checkSchema({
  city: {
    in: ['body'],
    errorMessage: 'City is wrong',
    isAlpha: true,
    isEmpty: false
  }
})

exports.add = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  City.create({ city: req.body.city })
    .then(result => {
      res.status(201).json(result)
    })
    .catch(() => {
      next(error(400, 'Error add city'))
    })
}

exports.removeValidation = checkSchema({
  id: {
    in: ['params', 'query'],
    errorMessage: 'ID is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  }
})

exports.remove = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  City.destroy({
    where: { id: req.params.id }
  })
    .then(result => {
      res.json(req.params.id)
    })
    .catch(() => {
      next(error(400, 'Error delete city'))
    })
}

exports.updateValidation = checkSchema({
  id: {
    in: ['params', 'query'],
    errorMessage: 'ID is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  city: {
    in: ['body'],
    errorMessage: 'City is wrong',
    isAlpha: true,
    isEmpty: false
  }
})

exports.update = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  City.update({
    city: req.body.city }, {
    where: { id: req.params.id }
  })
    .then((result) => {
      return City.findByPk(req.params.id)
    })
    .then(city => {
      if (city === null) {
        return next(error(404, `City with id = ${req.params.id} not found for update!`))
      }
      res.json(city)
    })
    .catch(() => {
      next(error(400, 'Error update city'))
    })
}
