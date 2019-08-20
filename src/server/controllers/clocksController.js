const { check, validationResult } = require('express-validator')
const error = require('../services/modules.js').makeError
const Clock = require('../models/clocks.js')

exports.list = function (req, res, next) {
  try {
    Clock.findAll()
      .then(clocks => {
        const json = JSON.stringify(clocks)
        try {
          const obj = JSON.parse(json)
          obj.sort((a, b) => {
            if (a.timeRepair > b.timeRepair) {
              return 1
            }
            if (a.timeRepair < b.timeRepair) {
              return -1
            }
          })
          res.json(obj)
        } catch (e) {
          res.send(json)
        }
      })
  } catch (e) {
    next(error(400, 'Error get list of clocks'))
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
    Clock.findByPk(req.body.id)
      .then((clock) => {
        const json = JSON.stringify(clock)
        res.send(json)
      })
  } catch (e) {
    next(error(400, 'Error get clock'))
  }
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
  try {
    Clock.create({
      typeClock: req.body.typeClock,
      timeRepair: req.body.timeRepair
    })
      .then(result => {
        const json = JSON.stringify(result)
        res.status(201).send(json)
      })
  } catch (e) {
    next(error(400, 'Error add clock'))
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
    Clock.destroy({
      where: {
        id: req.body.id
      }
    })
      .then(result => {
        const json = JSON.stringify(req.body)
        res.send(json)
      })
  } catch (e) {
    next(error(400, 'Error delete clock'))
  }
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
  try {
    Clock.update({
      typeClock: req.body.typeClock,
      timeRepair: req.body.timeRepair
    }, {
      where: {
        id: req.body.id
      }
    }).then((result) => {
      Clock.findByPk(req.body.id)
        .then(clock => {
          const json = JSON.stringify(clock)
          res.send(json)
        })
    })
  } catch (e) {
    next(error(400, 'Error update clock'))
  }
}
