const { check, validationResult } = require('express-validator')
const Op = require('sequelize').Op
const error = require('../services/modules.js').makeError
const getToday = require('../services/modules.js').getToday
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
        try {
          const obj = JSON.parse(json)
          obj.sort((a, b) => {
            const x = a.date.split('-')
            const y = b.date.split('-')
            if (+x[0] > +y[0]) {
              return 1
            } else if (+x[0] < +y[0]) {
              return -1
            } else if (+x[1] > +y[1]) {
              return 1
            } else if (+x[1] < +y[1]) {
              return -1
            } else if (+x[2] > +y[2]) {
              return 1
            } else if (+x[2] < +y[2]) {
              return -1
            } else if (a.time > b.time) {
              return 1
            } else if (a.time < b.time) {
              return -1
            } else {
              return 0
            }
          })
          const today = getToday()
          const indexToday = obj.findIndex((elem, index, array) => {
            const x = elem.date.split('-')
            if (Number(x[0]) >= today.year && Number(x[1]) >= today.month) {
              if (Number(x[2]) >= today.day) {
                if (elem.time >= today.hour) {
                  return true
                } else {
                  return false
                }
              } else {
                return false
              }
            }
            return false
          })
          if (indexToday !== -1) {
            const oldOrders = obj.splice(0, indexToday)
            const finallyObj = obj.concat(oldOrders)
            return res.json(finallyObj)
          }
          res.json(obj)
        } catch (e) {
          res.send(json)
        }
      })
  } catch (e) {
    next(error(400, 'Error get list of orders'))
  }
}

exports.getValidation = [
  check('id').isNumeric().not().isEmpty()
]

exports.get = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  try {
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

exports.removeValidation = [
  check('id').isNumeric().not().isEmpty()
]

exports.remove = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  try {
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

exports.updateValidation = [
  check('date').not().isEmpty(),
  check('time').isNumeric().not().isEmpty(),
  check('customerId').isNumeric().not().isEmpty(),
  check('clockId').isNumeric().not().isEmpty(),
  check('cityId').isNumeric().not().isEmpty(),
  check('masterId').isNumeric().not().isEmpty(),
  check('id').isNumeric().not().isEmpty()
]

exports.update = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  try {
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

exports.getWorkersValidation = [
  check('date').not().isEmpty(),
  check('time').isNumeric().not().isEmpty(),
  check('clockId').isNumeric().not().isEmpty(),
  check('cityId').isNumeric().not().isEmpty()
]

exports.getWorkers = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  try {
    const { date, time, clockId, cityId } = req.body
    Clock.findByPk(clockId)
      .then(clock => {
        req.body = {
          ...req.body,
          timeRepair: clock.timeRepair
        }
        Order.findAll({
          where: {
            date: date,
            cityId: cityId
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
                try {
                  masters.sort((a, b) => {
                    if (a.rating > b.rating) {
                      return 1
                    }
                    if (a.rating < b.rating) {
                      return -1
                    }
                    return 0
                  })

                  res.json(masters)
                } catch (e) {
                  res.send(json)
                }
              })
          })
      })
  } catch (e) {
    next(error(400, 'Error get free workers'))
  }
}

exports.addAdminValidation = [
  check('date').not().isEmpty(),
  check('time').isNumeric().not().isEmpty(),
  check('customerId').isNumeric().not().isEmpty(),
  check('clockId').isNumeric().not().isEmpty(),
  check('cityId').isNumeric().not().isEmpty(),
  check('masterId').isNumeric().not().isEmpty()
]

exports.addAdmin = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  try {
    const { date, time, customerId, clockId, cityId, masterId } = req.body
    Clock.findByPk(clockId)
      .then(reqClock => {
        Order.findAll({
          where: {
            masterId: masterId,
            cityId: cityId,
            date: date
          },
          include: [{
            model: Clock
          }]
        })
          .then(result => {
            const string = JSON.stringify(result)
            const obj = JSON.parse(string)
            const isCreated = obj.filter(order => {
              if (order.time < time) {
                if ((order.time + order.clock.timeRepair) < time) {
                  return false
                } else {
                  return true
                }
              } else {
                if ((time + reqClock.timeRepair) >= order.time) {
                  return true
                } else {
                  return false
                }
              }
            })
            if (isCreated.length) {
              return next(error(400, 'Master already busy at this time.'))
            }

            Master.findByPk(masterId)
              .then(master => {
                const stringMaster = JSON.stringify(master)
                const objMaster = JSON.parse(stringMaster)
                if (objMaster.cityId !== +cityId) {
                  return next(error(400, 'Master doesnt work in this town'))
                }
                Order.create({ time: time,
                  date: date,
                  cityId: cityId,
                  clockId: clockId,
                  customerId: customerId,
                  masterId: masterId })
                  .then(order => {
                    Order.findOne({
                      where: {
                        id: order.id
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
                      .then(newOrder => {
                        const json = JSON.stringify(newOrder)
                        res.status(201).send(json)
                      })
                  })
              })
          })
      })
  } catch (e) {
    next(error(400, 'Error create order'))
  }
}

exports.addValidation = [
  check('date').not().isEmpty(),
  check('time').isNumeric().not().isEmpty(),
  check('email').isEmail().not().isEmpty(),
  check('name').isAlpha().not().isEmpty(),
  check('clockId').isNumeric().not().isEmpty(),
  check('cityId').isNumeric().not().isEmpty(),
  check('masterId').isNumeric().not().isEmpty()
]

exports.add = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  try {
    const { date, time, email, clockId, cityId, masterId, name } = req.body
    Customer.findOrCreate({
      where: {
        email: email
      },
      defaults: {
        name: name
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
