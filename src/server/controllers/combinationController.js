const Worker = require('../models/workers.js')
const City = require('../models/cities.js')
const Clock = require('../models/clocks.js')
const User = require('../models/users.js')
const Order = require('../models/orders.js')

exports.getDataAdmin = function (req, res) {
  Promise.all([City.getAll(), Clock.getAll(), User.getAll(), Worker.getAll(), Order.getAll()])
    .then(result => {
      res.send(result)
    })
}

exports.getData = function (req, res) {
  Promise.all([Clock.getAll(), City.getAll(), Worker.getAll()])
    .then(result => {
      res.send(result)
    })
}
