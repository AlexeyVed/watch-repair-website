const { check, validationResult } = require('express-validator')
const error = require('../modules/services.js').makeError
const Customer = require('../models/customers.js')

exports.list = function (req, res, next) {
  Customer.findAll({
    order: [ ['email', 'ASC'] ]
  })
    .then(customers => {
      res.json(customers)
    })
    .catch(err => {
      next(error(400, 'Error get list of customers'))
    })
}

exports.addValidation = [
  check('email').isEmail().not().isEmpty(),
  check('name').isAlpha().not().isEmpty()
]

exports.add = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  Customer.create({
    email: req.body.email,
    name: req.body.name
  })
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      next(error(400, 'Error add customer'))
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
  Customer.findByPk(req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch(err => {
      next(error(400, 'Error get customer'))
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
  Customer.destroy({
    where: { id: req.params.id }
  })
    .then(result => {
      res.json(req.params.id)
    })
    .catch(err => {
      next(error(400, 'Error delete customer'))
    })
}

exports.updateValidation = [
  check('email').isEmail().not().isEmpty(),
  check('name').isAlpha().not().isEmpty(),
  check('id').isNumeric().not().isEmpty()
]

exports.update = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  Customer.update({
    name: req.body.name,
    email: req.body.email
  }, {
    where: { id: req.params.id }
  })
    .then((result) => {
      return Customer.findByPk(req.params.id)
    })
    .then(customer => {
      res.json(customer)
    })
    .catch(err => {
      next(error(400, 'Error update customer'))
    })
}
