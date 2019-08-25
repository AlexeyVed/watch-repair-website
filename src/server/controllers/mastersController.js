const { check, validationResult } = require('express-validator')
const error = require('../services/modules.js').makeError
const Master = require('../models/masters.js')
const City = require('../models/cities.js')

exports.list = function (req, res, next) {
  Master.findAll({
    include: [ { model: City } ],
    order: [
      [City, 'city', 'ASC'],
      ['name', 'ASC']
    ]
  })
    .then(masters => {
      res.json(masters)
    })
    .catch(err => {
      next(error(400, 'Error get list of masters'))
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
  Master.findOne({
    where: { id: req.body.id },
    include: [ { model: City } ]
  })
    .then((worker) => {
      res.send(worker)
    })
    .catch(err => {
      next(error(400, 'Error get master'))
    })
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
  Master.create({
    name: req.body.name,
    rating: req.body.rating,
    cityId: req.body.cityId
  })
    .then(result => {
      return Master.findOne({
        where: { id: result.id },
        include: [ { model: City } ]
      })
    })
    .then(master => {
      res.status(201).send(master)
    })
    .catch(err => {
      next(error(400, 'Error add master'))
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
  Master.destroy({
    where: { id: req.body.id }
  })
    .then(result => {
      res.json(req.body)
    })
    .catch(err => {
      next(error(400, 'Error delete master'))
    })
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
  Master.update({
    name: req.body.name,
    rating: req.body.rating,
    cityId: req.body.cityId
  }, {
    where: { id: req.body.id }
  })
    .then(result => {
      return Master.findOne({
        where: { id: req.body.id },
        include: [ { model: City } ]
      })
    })
    .then(master => {
      res.status(201).json(master)
    })
    .catch(err => {
      next(error(400, 'Error update master'))
    })
}
