const { check, validationResult } = require('express-validator')
const error = require('../services/modules.js').makeError
const Customer = require('../models/customers.js')

exports.list = function (req, res, next) {
  try {
    Customer.findAll()
      .then(customers => {
        const json = JSON.stringify(customers)
        try {
          const obj = JSON.parse(json)
          obj.sort((a, b) => {
            return a.email.toLowerCase().localeCompare(b.email.toLowerCase())
          })
          res.json(obj)
        } catch (e) {
          res.send(json)
        }
      })
  } catch (e) {
    next(error(400, 'Error get list of customers'))
  }
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
  try {
    Customer.create({
      email: req.body.email,
      name: req.body.name
    })
      .then(result => {
        const json = JSON.stringify(result)
        res.status(201).send(json)
      })
  } catch (e) {
    next(error(400, 'Error add customer'))
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
    Customer.findByPk(req.body.id)
      .then((user) => {
        const json = JSON.stringify(user)
        res.send(json)
      })
  } catch (e) {
    next(error(400, 'Error get customer'))
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
    Customer.destroy({
      where: {
        id: req.body.id
      }
    })
      .then(result => {
        const json = JSON.stringify(req.body)
        res.send(json)
      })
  } catch (e) {
    next(error(400, 'Error delete customer'))
  }
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
  try {
    Customer.update({
      name: req.body.name,
      email: req.body.email
    }, {
      where: {
        id: req.body.id
      }
    }).then((result) => {
      Customer.findByPk(req.body.id)
        .then(customer => {
          const json = JSON.stringify(customer)
          res.send(json)
        })
    })
  } catch (e) {
    next(error(400, 'Error update customer'))
  }
}
