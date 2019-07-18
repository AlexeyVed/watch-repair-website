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
  const order = new Order(null, clientName, clientEmail, timeRepair, city, date, time)
  const obj = {}
  order.getIdBusyMasters()
    .then(result => {
      console.log('get id busy masters', result)
      Worker.getWorkersWithoutBusy(result, city)
        .then(workers => {
          console.log('get worker without busy', workers)
          res.send(workers)
        })
        .catch(err => {
          console.log('catch')
          res.status(500).send('Error get work without Busy')
        })
    })
    .catch(err => {
      console.log('catch')
      res.status(500).send('Error get id bussy masters')
    })
}
