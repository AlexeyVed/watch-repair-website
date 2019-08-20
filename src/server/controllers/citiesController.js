const { check, validationResult } = require('express-validator')
const error = require('../services/modules.js').makeError
const City = require('../models/cities.js')

exports.list = function (req, res, next) {
  try {
    City.findAll()
      .then(cities => {
        const json = JSON.stringify(cities)
        try {
          const obj = JSON.parse(json)
          obj.sort((a, b) => {
            return a.city.localeCompare(b.city)
          })
          res.json(obj)
        } catch (e) {
          res.send(json)
        }
      })
  } catch (e) {
    next(error(400, 'Error get list of cities'))
  }
}

exports.getValidation = [
  check('id').isNumeric().not().isEmpty()
]

exports.get = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  try {
    City.findByPk(req.body.id)
      .then((city) => {
        const json = JSON.stringify(city)
        res.send(json)
      })
  } catch (e) {
    next(error(400, 'Error get city.'))
  }
}

exports.addValidation = [
  check('city').isAlpha().not().isEmpty()
]

exports.add = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  try {
    if (!req.body.city) {
      return next(error(400, 'Your must fill all fields'))
    }
    City.create({
      city: req.body.city
    })
      .then(result => {
        const json = JSON.stringify(result)
        res.status(201).send(json)
      })
  } catch (e) {
    next(error(400, 'Error add city'))
  }
}

exports.removeValidation = [
  check('id').isNumeric().not().isEmpty()
]

exports.remove = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  try {
    City.destroy({
      where: {
        id: req.body.id
      }
    })
      .then(result => {
        const json = JSON.stringify(req.body)
        res.send(json)
      })
  } catch (e) {
    next(error(400, 'Error delete city'))
  }
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
  try {
    if (!req.body.id || !req.body.city) {
      return next(error(400, 'Your must fill all fields'))
    }
    City.update({
      city: req.body.city
    }, {
      where: {
        id: req.body.id
      }
    }).then((result) => {
      City.findByPk(req.body.id)
        .then(city => {
          const json = JSON.stringify(city)
          res.send(json)
        })
    })
  } catch (e) {
    next(error(400, 'Error update city'))
  }
}
