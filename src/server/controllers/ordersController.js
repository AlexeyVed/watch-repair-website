const Order = require('../models/orders.js')
const Worker = require('../models/workers.js')

exports.getOrders = function (req, res) {
  Order.getAll()
    .then(result => {
      res.send(result)
    })
}

exports.deleteOrder = function (req, res) {
  Order.deleteOrder(req.body.id)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error delete order')
    })
}

exports.addOrder = function (req, res) {
  const {
    clientName, clientEmail, timeRepair, city, date, time } = req.body
  console.log({
    clientName: typeof clientName,
    clientEmail: typeof clientEmail,
    timeRepair: typeof timeRepair,
    city: typeof city,
    date: typeof date,
    time: typeof time
  })
  const order = new Order(null, clientName, clientEmail, timeRepair, city, date, time)
  const obj = {}
  order.getIdBusyMasters()
    .then(result => {
      Worker.getWorkersWithoutBusy(result, city)
        .then(workers => {
          res.send(workers)
        })
        .catch(err => {
          res.status(500).send('Error get work without Busy')
        })
    })
    .catch(err => {
      res.status(500).send('Error get id bussy masters')
    })
}
