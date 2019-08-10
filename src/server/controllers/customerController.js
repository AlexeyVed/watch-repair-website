const Customer = require('../models/customers.js')

exports.list = function (req, res) {
  Customer.findAll()
    .then(customers => {
      const json = JSON.stringify(customers)
      res.send(json)
    })
}

exports.add = function (req, res) {
  Customer.create({
    email: req.body.email,
    name: req.body.name
  })
    .then(result => {
      const json = JSON.stringify(result)
      res.status(201).send(json)
    })
    .catch(err => {

    })
}

exports.get = function (req, res) {
  Customer.findByPk(req.body.id)
    .then((user) => {
      const json = JSON.stringify(user)
      res.send(json)
    })
}

exports.delete = function (req, res) {
  Customer.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(result => {
      const json = JSON.stringify(req.body)
      res.send(json)
    })
}

exports.update = function (req, res) {
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
}
