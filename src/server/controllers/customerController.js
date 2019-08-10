const Customer = require('../models/customers.js')

exports.list = function (req, res) {
  Customer.findAll()
    .then(customers => {
      const json = JSON.stringify(customers)
      res.send(json)
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
      res.send('OK')
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
    res.send(result)
  })
}
