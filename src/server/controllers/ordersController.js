const Order = require('../models/orders.js')
const Worker = require('../models/workers.js')
const Clock = require('../models/clocks.js')
const Customer = require('../models/customers.js')

exports.list = function (req, res) {
  Order.list()
    .then(result => {
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

exports.getWorkers = function (req, res) {
  Clock.findOne(req.body.cityID)
    .then(clock => {
      req.body = {
        ...req.body,
        timeRepair: clock[0].timeRepair
      }
      const order = new Order(req.body)
      order.getIdBusyMasters()
        .then(result => {
          Worker.getWithoutBusy(result, req.body)
            .then(workers => {
              const json = JSON.stringify(workers)
              res.send(json)
            })
            .catch(err => {
              res.status(500).send('Error get work without Busy')
            })
        })
        .catch(err => {
          res.status(500).send('Error get id bussy masters')
        })
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
          Order.findOne(req.body.id)
            .then(order => {
              const json = JSON.stringify(order)
              res.send(json)
            })
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
  Customer.findByEmail(req.body.email)
    .then(result => {
      if (result.length) {
        const obj = {
          ...req.body,
          customerID: result[0].id
        }
        const order = new Order(obj)
        order.add()
          .then(result => {
            Order.findOne(result.insertId)
              .then(order => {
                const json = JSON.stringify(order)
                res.status(201).send(json)
              })
          })
      } else {
        const newCustomer = new Customer(req.body)
        newCustomer.add()
          .then(result => {
            const obj = {
              ...req.body,
              customerID: result.insertId
            }
            const order = new Order(obj)
            order.add()
              .then(result => {
                Order.findOne(result.insertId)
                  .then(order => {
                    const json = JSON.stringify(order)
                    res.status(201).send(json)
                  })
              })
          })
      }
    })
    .catch(err => {
      res.status(500).send(err)
    })
  /*  */
}
