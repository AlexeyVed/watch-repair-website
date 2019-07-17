const Order = require('../models/orders.js')

exports.getOrders = function (req, res) {
  Order.getAll()
    .then(result => {
      res.send(result)
    })
}

exports.addOrder = function (req, res) {
  const {
    clientName,
    clientEmail,
    timeRepair,
    city,
    date,
    time } = req.body
  const order = new Order(null, clientName, clientEmail, timeRepair, city, date, time)
  order.addOrder()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(404).send(err)
    })
}
