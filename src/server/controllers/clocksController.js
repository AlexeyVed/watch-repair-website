const { checkSchema, validationResult } = require('express-validator')
const error = require('../modules/services.js').makeError
const Clock = require('../models/clocks.js')

exports.list = function (req, res, next) {
  Clock.findAll({
    order: [ ['duration', 'ASC'] ]
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
      if (clock === null) {
        return next(error(404, `Clock with id = ${req.params.id} not found!`))
      }
      res.json(clock)
    })
    .catch(() => {
      next(error(400, 'Error get clock'))
    })
}

exports.addValidation = checkSchema({
  name: {
    in: ['body'],
    errorMessage: 'Type of clock is wrong',
    isAlpha: true,
    isEmpty: false
  },
  duration: {
    in: ['body'],
    errorMessage: 'Time repair is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false,
    custom: {
      options: (value, { req, location, path }) => {
        return req.body.duration > 0 && req.body.duration <= 12
      }
    }
  }
})

exports.add = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  const { name, duration } = req.body
  Clock.create({
    name,
    duration
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
    .catch(err => {
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        return next(error(409, 'This clock already have an order.'))
      }
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
  name: {
    in: ['body'],
    errorMessage: 'Type of clock is wrong',
    isAlpha: true,
    isEmpty: false
  },
  duration: {
    in: ['body'],
    errorMessage: 'Time repair is wrong',
    isInt: true,
    isEmpty: false,
    custom: {
      options: (value, { req, location, path }) => {
        return req.body.duration > 0 && req.body.duration <= 12
      }
    }
  }
})

exports.update = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  const { name, duration } = req.body
  Clock.update({
    name,
    duration
  }, {
    where: { id: req.params.id }
  })
    .then((result) => {
      return Clock.findByPk(req.params.id)
    })
    .then(clock => {
      if (clock === null) {
        return next(error(404, `Clock with id = ${req.params.id} not found for update!`))
      }
      res.json(clock)
    })
    .catch(() => {
      next(error(400, 'Error update clock'))
    })
}
