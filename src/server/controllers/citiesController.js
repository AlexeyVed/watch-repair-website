const City = require('../models/cities.js')

exports.list = function (req, res) {
  City.findAll()
    .then(cities => {
      const json = JSON.stringify(cities)
      res.send(json)
    })
}

exports.get = function (req, res) {
  City.findByPk(req.body.id)
    .then((city) => {
      const json = JSON.stringify(city)
      res.send(json)
    })
}

exports.add = function (req, res) {
  City.create({
    city: req.body.city
  })
    .then(result => {
      const json = JSON.stringify(result)
      res.status(201).send(json)
    })
    .catch(err => {

    })
}

exports.delete = function (req, res) {
  City.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(result => {
      res.send('OK')
    })
}

exports.update = function (req, res) {
  City.update({
    city: req.body.city
  }, {
    where: {
      id: req.body.id
    }
  }).then((result) => {
    res.send(result)
  })
}
