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

exports.makeOrder = function (req, res) {
  const {
    clientName, clientEmail, timeRepair, city, date, time } = req.body
  const order = new Order(null, clientName, clientEmail, timeRepair, city, date, time)
  const obj = {
    freeWorkers: [],
    insertId: null
  }
  order.getIdBusyMasters()
    .then(result => {
      Worker.getWorkersWithoutBusy(result, city)
        .then(workers => {
          obj.freeWorkers = workers
          order.addOrderWithoutMaster()
            .then((insert) => {
              obj.insertId = insert.insertId
              res.send(obj)
            })
        })
        .catch(err => {
          res.status(500).send('Error get work without Busy')
        })
    })
    .catch(err => {
      res.status(500).send('Error get id bussy masters')
    })
}

exports.addOrder = function (req, res) {
  Order.addOrder(req.body.idMaster, req.body.id)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error add masters')
    })
}
