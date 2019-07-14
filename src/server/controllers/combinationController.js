const Worker = require('../models/workers.js')
const City = require('../models/cities.js')
const Clock = require('../models/clocks.js')
const User = require('../models/users.js')

exports.getData = function (req, res) {
  Promise.all([City.getAll(), Clock.getAll(), User.getAll(), Worker.getAll()])
    .then(result => {
      res.send(result)
    })
}
