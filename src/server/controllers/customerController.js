const Customer = require('../models/customers.js')

exports.list = function (req, res) {
  Customer.list()
    .then(result => {
      const json = JSON.stringify(result)
      res.send(json)
    })
}

exports.add = function (req, res) {
  const customer = new Customer(req.body)
  customer.check()
    .then(() => {
      customer.registration()
        .then((result) => {
          Customer.findOne(result.insertId)
            .then(client => {
              const json = JSON.stringify(client[0])
              res.status(201).send(json)
            })
            .catch(err => {
              res.status(500).send('some broke')
            })
        })
        .catch(error => {
          res.status(400).send(error)
        })
    })
    .catch(error => {
      res.status(401).send('Email already used.')
    })
}

exports.update = function (req, res) {
  Customer.findOne(req.body.id)
    .then(userFromDB => {
      const customer = new Customer(userFromDB[0])
      customer.update(req.body)
        .then(result => {
          const json = JSON.stringify(req.body)
          res.send(json)
        })
        .catch(err => {
          res.status(400).send('Error update clock')
        })
    })
}

exports.get = function (req, res) {
  Customer.findOne(req.body.id)
    .then((user) => {
      const json = JSON.stringify(user[0])
      res.send(json)
    })
}

exports.delete = function (req, res) {
  Customer.delete(req.body.id)
    .then(result => {
      const json = JSON.stringify(req.body)
      res.send(json)
    })
    .catch(err => {
      res.status(400).send('Error delete user')
    })
}
