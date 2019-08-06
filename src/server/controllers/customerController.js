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
  Customer.findByEmail(req.body.email)
    .then(result => {
      if (!result.length) {
        customer.add()
          .then(insert => {
            Customer.findOne(insert.insertId)
              .then(customer => {
                const json = JSON.stringify(customer[0])
                res.send(json)
              })
          })
          .catch(err => {
            res.status(500).send('Error add customers')
          })
      }
    })
    .catch(err => {
      res.status(400).send('Error add customer')
    })
}

exports.update = function (req, res) {
  Customer.findOne(req.body.id)
    .then(userFromDB => {
      const customer = new Customer(userFromDB[0])
      customer.update(req.body)
        .then(result => {
          Customer.findOne(req.body.id)
            .then(customer => {
              const json = JSON.stringify(customer[0])
              res.send(json)
            })
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
