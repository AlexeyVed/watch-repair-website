const { check, validationResult } = require('express-validator')
const error = require('../services/modules.js').makeError
const Master = require('../models/masters.js')
const City = require('../models/cities.js')

exports.list = function (req, res, next) {
  try {
    Master.findAll({
      include: [{
        model: City
      }]
    })
      .then(masters => {
        const json = JSON.stringify(masters)
        try {
          const obj = JSON.parse(json)
          obj.sort((a, b) => {
            return a.city.city.toLowerCase().localeCompare(b.city.city.toLowerCase())
          })
          res.json(obj)
        } catch (e) {
          res.send(json)
        }
      })
  } catch (e) {
    next(error(400, 'Error get list of masters'))
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
    Master.findOne({
      where: {
        id: req.body.id
      },
      include: [{
        model: City
      }]
    })
      .then((worker) => {
        const json = JSON.stringify(worker)
        res.send(json)
      })
  } catch (e) {
    next(error(400, 'Error get master'))
  }
}

exports.addValidation = [
  check('name').isAlpha().not().isEmpty(),
  check('rating').isNumeric().not().isEmpty(),
  check('cityId').isNumeric().not().isEmpty()
]

exports.add = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  try {
    Master.create({
      name: req.body.name,
      rating: req.body.rating,
      cityId: req.body.cityId
    })
      .then(result => {
        Master.findOne({
          where: {
            id: result.id
          },
          include: [{
            model: City
          }]
        })
          .then(master => {
            const json = JSON.stringify(master)
            res.status(201).send(json)
          })
      })
  } catch (e) {
    next(error(400, 'Error add master'))
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
    Master.destroy({
      where: {
        id: req.body.id
      }
    })
      .then(result => {
        const json = JSON.stringify(req.body)
        res.send(json)
      })
  } catch (e) {
    next(error(400, 'Error delete master'))
  }
}

exports.updateValidation = [
  check('name').isAlpha().not().isEmpty(),
  check('rating').isNumeric().not().isEmpty(),
  check('cityId').isNumeric().not().isEmpty(),
  check('id').isNumeric().not().isEmpty()
]

exports.update = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  try {
    Master.update({
      name: req.body.name,
      rating: req.body.rating,
      cityId: req.body.cityId
    }, {
      where: {
        id: req.body.id
      }
    })
      .then(result => {
        Master.findOne({
          where: {
            id: req.body.id
          },
          include: [{
            model: City
          }]
        })
          .then(master => {
            const json = JSON.stringify(master)
            res.status(201).send(json)
          })
      })
  } catch (e) {
    next(error(400, 'Error update master'))
  }
}
