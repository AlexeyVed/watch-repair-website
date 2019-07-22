const City = require('../models/cities.js')

exports.getCities = function (req, res) {
  City.getAll()
    .then(result => {
      res.send(result)
    })
}

exports.updateCity = function (req, res) {
  const city = new City(req.body)
  city.updateCity()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error update city')
    })
}

exports.addCity = function (req, res) {
  const city = new City(req.body)
  city.addCity()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error add city')
    })
}

exports.deleteCity = function (req, res) {
  const city = new City(req.body)
  city.deleteCity(req.body.id)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error delete city')
    })
}
