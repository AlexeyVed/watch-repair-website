const { check, validationResult } = require('express-validator')
const error = require('../services/modules.js').makeError
const Clock = require('../models/clocks.js')

exports.list = function (req, res, next) {
  Clock.findAll({
    order: [ ['timeRepair', 'ASC'] ]
  })
    .then(clocks => {
      res.json(clocks)
    })
    .catch(err => {
      next(error(400, 'Error get list of clocks'))
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
  Clock.findByPk(req.query.id)
    .then((clock) => {
      res.json(clock)
    })
    .catch(err => {
      next(error(400, 'Error get clock'))
    })
}

exports.addValidation = [
  check('typeClock').isAlpha().not().isEmpty(),
  check('timeRepair').isNumeric().not().isEmpty()
]

exports.add = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  Clock.create({
    typeClock: req.body.typeClock,
    timeRepair: req.body.timeRepair
  })
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      next(error(400, 'Error add clock'))
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
  Clock.destroy({
    where: { id: req.query.id }
  })
    .then(result => {
      res.json(req.query.id)
    })
    .catch(err => {
      next(error(400, 'Error delete clock'))
    })
}

exports.updateValidation = [
  check('typeClock').isAlpha().not().isEmpty(),
  check('timeRepair').isNumeric().not().isEmpty(),
  check('id').isNumeric().not().isEmpty()
]

exports.update = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  Clock.update({
    typeClock: req.body.typeClock,
    timeRepair: req.body.timeRepair
  }, {
    where: { id: req.query.id }
  })
    .then((result) => {
      return Clock.findByPk(req.body.id)
    })
    .then(clock => {
      res.json(clock)
    })
    .catch(err => {
      next(error(400, 'Error update clock'))
    })
}
