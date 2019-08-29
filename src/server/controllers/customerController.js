const { checkSchema, validationResult } = require('express-validator')
const error = require('../modules/services.js').makeError
const Customer = require('../models/customers.js')

exports.list = function (req, res, next) {
  Customer.findAll({
    order: [ ['email', 'ASC'] ]
  })
    .then(customers => {
      res.json(customers)
    })
    .catch(() => {
      next(error(400, 'Error get list of customers'))
    })
}

exports.addValidation = checkSchema({
  email: {
    in: ['body'],
    errorMessage: 'Email is wrong',
    isEmail: true,
    isEmpty: false
  },
  name: {
    in: ['body'],
    errorMessage: 'Name is wrong',
    isAlpha: true,
    isEmpty: false
  }
})

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
    .catch(() => {
      next(error(400, 'Error add customer'))
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
  Customer.findByPk(req.params.id)
    .then((user) => {
      res.json(user)
    })
    .catch(() => {
      next(error(400, 'Error get customer'))
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
  Customer.destroy({
    where: { id: req.params.id }
  })
    .then(result => {
      res.json(req.params.id)
    })
    .catch(() => {
      next(error(400, 'Error delete customer'))
    })
}

exports.updateValidation = checkSchema({
  email: {
    in: ['body'],
    errorMessage: 'Email is wrong',
    isEmail: true,
    isEmpty: false
  },
  name: {
    in: ['body'],
    errorMessage: 'Name is wrong',
    isAlpha: true,
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
    .catch(() => {
      next(error(400, 'Error update customer'))
    })
}
