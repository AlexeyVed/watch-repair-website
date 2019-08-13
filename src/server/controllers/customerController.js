const error = require('../services/modules.js').makeError
const Customer = require('../models/customers.js')

exports.list = function (req, res, next) {
  try {
    Customer.findAll()
      .then(customers => {
        const json = JSON.stringify(customers)
        res.send(json)
      })
  } catch (e) {
    next(error(400, 'Error get list of customers'))
  }
}

exports.add = function (req, res, next) {
  try {
    if (!req.body.email || !req.body.name) {
      return next(error(400, 'Your must fill all fields'))
    }
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

exports.get = function (req, res, next) {
  try {
    if (!req.body.id) {
      return next(error(400, 'Your must fill all fields'))
    }
    Customer.findByPk(req.body.id)
      .then((user) => {
        const json = JSON.stringify(user)
        res.send(json)
      })
  } catch (e) {
    next(error(400, 'Error get customer'))
  }
}

exports.delete = function (req, res, next) {
  try {
    if (!req.body.id) {
      return next(error(400, 'Your must fill all fields'))
    }
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

exports.update = function (req, res, next) {
  try {
    if (!req.body.email || !req.body.name || !req.body.id) {
      return next(error(400, 'Your must fill all fields'))
    }
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
