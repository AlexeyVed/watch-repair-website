const City = require('../models/cities.js')

exports.list = function (req, res) {
  City.list()
    .then(result => {
      const json = JSON.stringify(result)
      res.send(json)
    })
}

exports.update = function (req, res) {
  const city = new City(req.body)
  city.update()
    .then(result => {
      const json = JSON.stringify(result)
      res.send(json)
    })
    .catch(err => {
      res.status(400).send('Error update city')
    })
}

exports.add = function (req, res) {
  const city = new City(req.body)
  city.add()
    .then(result => {
      const json = JSON.stringify(result)
      res.send(json)
    })
    .catch(err => {
      res.status(400).send('Error add city')
    })
}

exports.delete = function (req, res) {
  const city = new City(req.body)
  city.delete(req.body.id)
    .then(result => {
      const json = JSON.stringify(result)
      res.send(json)
    })
    .catch(err => {
      res.status(400).send('Error delete city')
    })
}
