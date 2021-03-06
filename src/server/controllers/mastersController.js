const { checkSchema, validationResult } = require('express-validator')
const error = require('../modules/services.js').makeError
const Master = require('../models/masters.js')
const City = require('../models/cities.js')

exports.list = function (req, res, next) {
  Master.findAll({
    include: [ { model: City } ],
    order: [
      [City, 'name', 'ASC'],
      ['name', 'ASC']
    ]
  })
    .then(masters => {
      res.json(masters)
    })
    .catch(() => {
      next(error(400, 'Error get list of masters'))
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
  Master.findOne({
    where: { id: req.params.id },
    include: [ { model: City } ]
  })
    .then((worker) => {
      if (worker === null) {
        return next(error(404, `Master with id = ${req.params.id} not found!`))
      }
      res.send(worker)
    })
    .catch(() => {
      next(error(400, 'Error get master'))
    })
}

exports.addValidation = checkSchema({
  rating: {
    in: ['body'],
    errorMessage: 'Rating is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  name: {
    in: ['body'],
    errorMessage: 'Name is wrong',
    isAlpha: true,
    isEmpty: false
  },
  city_id: {
    in: ['body'],
    errorMessage: 'City is wrong',
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
  const { name, rating, city_id } = req.body
  Master.create({
    name,
    rating,
    city_id
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
    .catch(() => {
      next(error(400, 'Error add master'))
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
  Master.destroy({
    where: { id: req.params.id }
  })
    .then(result => {
      res.json(req.params.id)
    })
    .catch(err => {
      if (err.name === 'SequelizeForeignKeyConstraintError') {
        return next(error(409, 'Master have an orders.'))
      }
      next(error(400, 'Error delete master'))
    })
}

exports.updateValidation = checkSchema({
  rating: {
    in: ['body'],
    errorMessage: 'Rating is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  name: {
    in: ['body'],
    errorMessage: 'Name is wrong',
    isAlpha: true,
    isEmpty: false
  },
  city_id: {
    in: ['body'],
    errorMessage: 'City is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  id: {
    in: ['params', 'query'],
    errorMessage: 'ID is wrong',
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
  const { name, rating, city_id } = req.body
  Master.update({
    name,
    rating,
    city_id
  }, {
    where: { id: req.params.id }
  })
    .then(result => {
      return Master.findOne({
        where: { id: req.params.id },
        include: [ { model: City } ]
      })
    })
    .then(master => {
      if (master === null) {
        return next(error(404, `Master with id = ${req.params.id} not found for update!`))
      }
      res.status(201).json(master)
    })
    .catch(() => {
      next(error(400, 'Error update master'))
    })
}
