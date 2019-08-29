const { checkSchema, validationResult } = require('express-validator')
const error = require('../modules/services.js').makeError
const Clock = require('../models/clocks.js')

exports.list = function (req, res, next) {
  Clock.findAll({
    order: [ ['timeRepair', 'ASC'] ]
  })
    .then(clocks => {
      res.json(clocks)
    })
    .catch(() => {
      next(error(400, 'Error get list of clocks'))
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
  Clock.findByPk(req.params.id)
    .then((clock) => {
      res.json(clock)
    })
    .catch(() => {
      next(error(400, 'Error get clock'))
    })
}

exports.addValidation = checkSchema({
  typeClock: {
    in: ['body'],
    errorMessage: 'Type of clock is wrong',
    isAlpha: true,
    isEmpty: false
  },
  timeRepair: {
    in: ['body'],
    errorMessage: 'Time repair is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  }
})

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
    .catch(() => {
      next(error(400, 'Error add clock'))
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
  Clock.destroy({
    where: { id: req.params.id }
  })
    .then(result => {
      res.json(req.params.id)
    })
    .catch(() => {
      next(error(400, 'Error delete clock'))
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
  typeClock: {
    in: ['body'],
    errorMessage: 'Type of clock is wrong',
    isAlpha: true,
    isEmpty: false
  },
  timeRepair: {
    in: ['body'],
    errorMessage: 'Time repair is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  }
})

exports.update = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  Clock.update({
    typeClock: req.body.typeClock,
    timeRepair: req.body.timeRepair
  }, {
    where: { id: req.params.id }
  })
    .then((result) => {
      return Clock.findByPk(req.params.id)
    })
    .then(clock => {
      res.json(clock)
    })
    .catch(() => {
      next(error(400, 'Error update clock'))
    })
}
