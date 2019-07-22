const Order = require('../models/orders.js')
const Worker = require('../models/workers.js')

exports.getOrders = function (req, res) {
  Order.getAll()
    .then(result => {
      res.send(result)
    })
}

exports.deleteOrder = function (req, res) {
  Order.deleteOrder(req.body)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error delete order')
    })
}

exports.makeOrder = function (req, res) {
  const order = new Order(req.body)
  const obj = {
    freeWorkers: [],
    insertId: null
  }
  order.getIdBusyMasters()
    .then(result => {
      console.log(result)
      Worker.getWorkersWithoutBusy(result, req.body)
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

exports.addOrderAdmin = function (req, res) {
  const order = new Order(req.body)
  order.addOrderAdmin()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(500).send('Error add order admin')
    })
}

exports.updateOrder = function (req, res) {
  const order = new Order(req.body)
  order.updateOrder()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(500).send('Error update order')
    })
}

exports.addOrder = function (req, res) {
  Order.addOrder(req.body)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error add masters')
    })
}
