const City = require('../models/cities.js')

exports.getCities = function (req, res) {
  City.getAll()
    .then(result => {
      res.send(result)
    })
}

exports.addCity = function (req, res) {
  const city = new City(req.body.city)
  city.addCity()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error add city')
    })
}
