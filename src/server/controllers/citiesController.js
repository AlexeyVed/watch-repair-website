const City = require('../models/cities.js')

exports.getCities = function (req, res) {
  City.getAll()
    .then(result => {
      res.send(result)
    })
}
