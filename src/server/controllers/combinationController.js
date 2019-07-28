const Worker = require('../models/workers.js')
const City = require('../models/cities.js')
const Clock = require('../models/clocks.js')
const User = require('../models/users.js')
const Order = require('../models/orders.js')

exports.listAdmin = function (req, res) {
  Promise.all([City.list(), Clock.list(), User.list(), Worker.list(), Order.list()])
    .then(result => {
      const json = JSON.stringify(result)
      res.send(json)
    })
}

exports.list = function (req, res) {
  Promise.all([Clock.list(), City.list(), Worker.list()])
    .then(result => {
      const json = JSON.stringify(result)
      res.send(json)
    })
}
