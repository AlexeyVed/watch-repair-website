const Sequelize = require('sequelize')
const Op = Sequelize.Op
const Order = require('../models/orders.js')
const Master = require('../models/masters.js')
const Clock = require('../models/clocks.js')
const Customer = require('../models/customers.js')
const City = require('../models/cities.js')

exports.list = function (req, res) {
  Order.findAll({
    include: [
      {
        model: Master
      },
      {
        model: Clock
      },
      {
        model: Customer
      },
      {
        model: City
      }]
  })
    .then(orders => {
      const json = JSON.stringify(orders)
      res.send(json)
    })
}

exports.get = function (req, res) {
  Order.findOne({
    where: {
      id: req.body.id
    },
    include: [
      {
        model: Master
      },
      {
        model: Clock
      },
      {
        model: Customer
      },
      {
        model: City
      }]
  })
    .then((order) => {
      const json = JSON.stringify(order)
      res.send(json)
    })
}

exports.delete = function (req, res) {
  Order.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(result => {
      res.send('OK')
    })
}

exports.update = function (req, res) {
  Order.update({
    date: req.body.date,
    time: req.body.time,
    customerId: req.body.customerId,
    clockId: req.body.clockId,
    cityId: req.body.cityId,
    masterId: req.body.masterId
  }, {
    where: {
      id: req.body.id
    }
  }).then((result) => {
    res.send(result)
  })
}

exports.getWorkers = function (req, res) {
  Clock.findByPk(req.body.clockId)
    .then(clock => {
      req.body = {
        ...req.body,
        timeRepair: clock.timeRepair
      }
      Order.findAll({
        where: {
          date: req.body.date,
          cityId: req.body.cityId
        },
        include: [
          {
            model: Clock
          }]
      })
        .then(ordersInDate => {
          const { time, timeRepair } = req.body
          return ordersInDate.filter(order => {
            if (order.time < time) {
              if ((order.time + order.clock.timeRepair) < time) {
                return false
              } else {
                return true
              }
            } else {
              if ((time + timeRepair) >= order.time) {
                return true
              } else {
                return false
              }
            }
          })
        })
        .then(busyMasters => {
          const arrayIdBusyMaster = busyMasters.map(master => master.masterId)
          console.log(arrayIdBusyMaster)
          Master.findAll({
            where: {
              cityId: req.body.cityId,
              id: {
                [Op.notIn]: arrayIdBusyMaster
              }
            },
            include: [
              {
                model: City
              }
            ]

          })
            .then(workers => {
              const json = JSON.stringify(workers)
              res.send(json)
            })
            .catch(err => {

            })
        })
    })
}
/// /////////////////////////////////

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

exports.add = function (req, res) {
  Customer.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      name: req.body.name
    }
  })
    .then(([user, created]) => {
      req.body = {
        ...req.body,
        customerId: user.get({
          plain: true
        }).id
      }
      Order.create({
        time: req.body.time,
        date: req.body.date,
        customerId: req.body.customerId,
        clockId: req.body.clockId,
        cityId: req.body.cityId,
        masterId: req.body.masterId
      })
        .then(result => {
          res.status(201).send(result)
        })
    })
    .catch(err => {
      res.status(500).send(err)
    })
}
