const Op = require('sequelize').Op
const error = require('../services/modules.js').makeError
const Order = require('../models/orders.js')
const Master = require('../models/masters.js')
const Clock = require('../models/clocks.js')
const Customer = require('../models/customers.js')
const City = require('../models/cities.js')

exports.list = function (req, res, next) {
  try {
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
  } catch (e) {
    next(error(400, 'Error get list of orders'))
  }
}

exports.get = function (req, res, next) {
  try {
    if (!req.body.id) {
      return next(error(400, 'Your must fill all fields'))
    }
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
  } catch (e) {
    next(error(400, 'Error get order'))
  }
}

exports.delete = function (req, res, next) {
  try {
    if (!req.body.id) {
      return next(error(400, 'Your must fill all fields'))
    }
    Order.destroy({
      where: {
        id: req.body.id
      }
    })
      .then(result => {
        const json = JSON.stringify(req.body)
        res.send(json)
      })
  } catch (e) {
    next(error(400, 'Error delete order'))
  }
}

exports.update = function (req, res, next) {
  try {
    console.log(req.body)
    const { date, time, customerId, clockId, cityId, masterId, id } = req.body
    if (!date || !time || !customerId || !clockId || !cityId || !masterId || !id) {
      return next(error(400, 'Your must fill all fields'))
    }
    Order.update({
      date: date,
      time: time,
      customerId: customerId,
      clockId: clockId,
      cityId: cityId,
      masterId: masterId
    }, {
      where: {
        id: id
      }
    })
      .then((result) => {
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
      })
  } catch (e) {
    next(error(400, 'Error update order'))
  }
}

exports.getWorkers = function (req, res, next) {
  try {
    const { date, time, clockId, cityId } = req.body
    if (!date || !time || !clockId || !cityId) {
      return next(error(400, 'Your must fill all fields'))
    }
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
                const masters = JSON.parse(json)
                if (!masters.length) {
                  return next(error(404, 'There are no free masters in your city at this time. Please choose other time.'))
                }
                res.send(json)
              })
          })
      })
  } catch (e) {
    next(error(400, 'Error get free workers'))
  }
}

exports.addAdmin = function (req, res, next) {
  try {
    const { date, time, customerId, clockId, cityId, masterId } = req.body
    if (!date || !time || !customerId || !clockId || !cityId || !masterId) {
      return next(error(400, 'Your must fill all fields'))
    }
    Order.create({
      time: time,
      date: date,
      cityId: cityId,
      clockId: clockId,
      customerId: customerId,
      masterId: masterId
    })
      .then(result => {
        Order.findOne({
          where: {
            id: result.id
          },
          include: [{
            model: City
          },
          {
            model: Clock
          },
          {
            model: Customer
          },
          {
            model: Master
          }

          ]
        })
          .then(master => {
            const json = JSON.stringify(master)
            res.status(201).send(json)
          })
      })
  } catch (e) {
    next(error(400, 'Error create order'))
  }
}

exports.add = function (req, res, next) {
  try {
    console.log(req.body)
    const { date, time, email, clockId, cityId, masterId } = req.body
    if (!date || !time || !email || !clockId || !cityId || !masterId) {
      return next(error(400, 'Your must fill all fields'))
    }
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
          time: time,
          date: date,
          customerId: req.body.customerId,
          clockId: clockId,
          cityId: cityId,
          masterId: masterId
        })
          .then(result => {
            res.status(201).send(result)
          })
      })
  } catch (e) {
    next(error(400, 'Error add order'))
  }
}
