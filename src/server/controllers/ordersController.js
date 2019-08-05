const Order = require('../models/orders.js')
const Worker = require('../models/workers.js')

exports.list = function (req, res) {
  Order.list()
    .then(result => {
      console.log(result)
      const json = JSON.stringify(result)
      res.send(json)
    })
}

exports.delete = function (req, res) {
  Order.delete(req.body.id)
    .then(result => {
      const json = JSON.stringify(req.body)
      res.send(json)
    })
    .catch(err => {
      res.status(400).send('Error delete order')
    })
}

exports.make = function (req, res) {
  const order = new Order(req.body)
  const obj = {
    freeWorkers: [],
    insertId: null
  }
  order.getIdBusyMasters()
    .then(result => {
      Worker.getWithoutBusy(result, req.body)
        .then(workers => {
          obj.freeWorkers = workers
          order.addWithoutMaster()
            .then((insert) => {
              obj.insertId = insert.insertId
              const json = JSON.stringify(obj)
              res.send(json)
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

exports.addAdmin = function (req, res) {
  const order = new Order(req.body)
  order.addAdmin()
    .then(result => {
      Order.findOne(result.insertId)
        .then((orders) => {
          const json = JSON.stringify(orders[0])
          res.status(201).send(json)
        })
    })
    .catch(err => {
      res.status(500).send('Error add order admin')
    })
}

exports.update = function (req, res) {
  Order.findOne(req.body.id)
    .then(orderFromDB => {
      const order = new Order(orderFromDB[0])
      order.update(req.body)
        .then(result => {
          const json = JSON.stringify(req.body)
          res.send(json)
        })
        .catch(err => {
          res.status(500).send('Error update order')
        })
    })
}

exports.get = function (req, res) {
  Order.findOne(req.body.id)
    .then((order) => {
      const json = JSON.stringify(order[0])
      res.send(json)
    })
}

exports.add = function (req, res) {
  Order.add(req.body)
    .then(result => {
      const json = JSON.stringify(result)
      res.send(json)
    })
    .catch(err => {
      res.status(400).send('Error add masters')
    })
}
