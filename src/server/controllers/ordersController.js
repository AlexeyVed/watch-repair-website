const { checkSchema, validationResult } = require('express-validator')
const Op = require('sequelize').Op
const error = require('../modules/services.js').makeError
const getToday = require('../modules/services.js').getToday
const sendMsg = require('../modules/sendEmail.js').sendSuccessfullyMsg
const Order = require('../models/orders.js')
const Master = require('../models/masters.js')
const Clock = require('../models/clocks.js')
const Customer = require('../models/customers.js')

exports.list = function (req, res, next) {
  Order.findAll({
    include: [ { all: true } ],
    order: [
      ['date', 'ASC'],
      ['time', 'ASC']
    ],
    raw: true,
    nest: true
  })
    .then(orders => {
      const today = getToday()
      const indexToday = orders.findIndex((elem, index, array) => {
        const x = elem.date.split('-')
        return (Number(x[0]) >= today.year && Number(x[1]) >= today.month)
          ? (Number(x[2]) >= today.day) ? elem.time >= today.hour : false : false
      })
      if (indexToday !== -1) {
        const oldOrders = orders.splice(0, indexToday)
        const finallyObj = orders.concat(oldOrders)
        return res.json(finallyObj)
      }
      res.json(orders)
    })
    .catch(() => {
      next(error(400, 'Error get list of orders'))
    })
}

exports.getValidation = checkSchema({
  id: {
    in: ['params', 'query'],
    errorMessage: 'ID is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  }
})

exports.get = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  Order.findOne({
    where: { id: req.params.id },
    include: [{ all: true }]
  })
    .then(order => {
      if (order === null) {
        return next(error(404, `Order with id = ${req.params.id} not found!`))
      }
      res.json(order)
    })
    .catch(() => {
      next(error(400, 'Error get order'))
    })
}

exports.removeValidation = checkSchema({
  id: {
    in: ['params', 'query'],
    errorMessage: 'ID is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  }
})

exports.remove = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  Order.destroy({
    where: { id: req.params.id }
  })
    .then(result => {
      res.json(req.params.id)
    })
    .catch(() => {
      next(error(400, 'Error delete order'))
    })
}

exports.updateValidation = checkSchema({
  id: {
    in: ['params', 'query'],
    errorMessage: 'ID is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  cityId: {
    in: ['body'],
    errorMessage: 'City is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  masterId: {
    in: ['body'],
    errorMessage: 'Master is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  clockId: {
    in: ['body'],
    errorMessage: 'Clock is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  customerId: {
    in: ['body'],
    errorMessage: 'Customer is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  date: {
    in: ['body'],
    errorMessage: 'Date is wrong',
    isEmpty: false
  },
  time: {
    in: ['body'],
    errorMessage: 'Time is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  }
})

exports.update = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  const { date, time, customerId, clockId, cityId, masterId } = req.body
  Master.findByPk(masterId, {
    raw: true,
    nest: true
  })
    .then(master => {
      if (master.cityId !== +cityId) {
        return next(error(400, 'Master doesnt work in this town'))
      }
      return true
    })
    .then(() => {
      return Order.update({
        date: date,
        time: time,
        customerId: customerId,
        clockId: clockId,
        cityId: cityId,
        masterId: masterId
      }, {
        where: { id: req.params.id }
      })
    })
    .then(result => {
      return Order.findOne({
        where: { id: req.params.id },
        include: [{ all: true }]
      })
    })
    .then((order) => {
      if (order === null) {
        return next(error(404, `Order with id = ${req.params.id} not found for update!`))
      }
      res.json(order)
    })
    .catch(() => {
      next(error(400, 'Error update order'))
    })
}

exports.getWorkersValidation = checkSchema({
  cityId: {
    in: ['body'],
    errorMessage: 'City is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  clockId: {
    in: ['body'],
    errorMessage: 'Clock is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  date: {
    in: ['body'],
    errorMessage: 'Date is wrong',
    isEmpty: false
  },
  time: {
    in: ['body'],
    errorMessage: 'Time is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  }
})

exports.getWorkers = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  const { date, clockId, cityId } = req.body
  Clock.findByPk(clockId)
    .then(clock => {
      req.body = { ...req.body, timeRepair: clock.timeRepair }
      return Order.findAll({
        where: {
          date: date,
          cityId: cityId
        },
        include: [ { model: Clock } ]
      })
    })
    .then(ordersInDate => {
      const { time, timeRepair } = req.body
      return ordersInDate.filter(order => {
        return (order.time < time)
          ? ((order.time + order.clock.timeRepair) >= time)
          : ((time + timeRepair) >= order.time)
      })
    })
    .then(busyMasters => {
      const arrayIdBusyMaster = busyMasters.map(master => master.masterId)
      return Master.findAll({
        where: {
          cityId: req.body.cityId,
          id: { [Op.notIn]: arrayIdBusyMaster }
        },
        include: [{ all: true }],
        order: [ ['rating', 'ASC'] ]
      })
    })
    .then(workers => {
      if (!workers.length) {
        return next(error(404, 'There are no free masters in your city at this time. Please choose other time.'))
      }
      res.json(workers)
    })
    .catch(() => {
      next(error(400, 'Error get free workers'))
    })
}

exports.addAdminValidation = checkSchema({
  cityId: {
    in: ['body'],
    errorMessage: 'City is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  masterId: {
    in: ['body'],
    errorMessage: 'Master is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  clockId: {
    in: ['body'],
    errorMessage: 'Clock is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  customerId: {
    in: ['body'],
    errorMessage: 'Customer is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  date: {
    in: ['body'],
    errorMessage: 'Date is wrong',
    isEmpty: false
  },
  time: {
    in: ['body'],
    errorMessage: 'Time is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  }
})

exports.addAdmin = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  const { date, time, customerId, clockId, cityId, masterId } = req.body
  Clock.findByPk(clockId)
    .then(reqClock => {
      req.body = { ...req.body, timeRepair: reqClock.timeRepair }
      return Order.findAll({
        where: {
          masterId: masterId,
          cityId: cityId,
          date: date
        },
        include: [{ model: Clock }],
        raw: true,
        nest: true
      })
    })
    .then(result => {
      const isCreated = result.filter(order => {
        return (order.time < time)
          ? ((order.time + order.clock.timeRepair) >= time)
          : ((time + req.body.timeRepair) >= order.time)
      })
      if (isCreated.length) {
        return next(error(400, 'Master already busy at this time.'))
      }
      return Master.findByPk(masterId)
    })
    .then(master => {
      if (master.cityId !== +cityId) {
        return next(error(400, 'Master doesnt work in this town'))
      }
      return Order.create({
        time: time,
        date: date,
        cityId: cityId,
        clockId: clockId,
        customerId: customerId,
        masterId: masterId
      })
    })
    .then(order => {
      return Order.findOne({
        where: { id: order.id },
        include: [ { all: true } ]
      })
    })
    .then(newOrder => {
      res.status(201).json(newOrder)
    })
    .catch(() => {
      next(error(400, 'Error create order'))
    })
}

exports.addValidation = checkSchema({
  name: {
    in: ['body'],
    errorMessage: 'Name is wrong',
    isAlpha: true,
    isEmpty: false
  },
  cityId: {
    in: ['body'],
    errorMessage: 'City is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  masterId: {
    in: ['body'],
    errorMessage: 'Master is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  clockId: {
    in: ['body'],
    errorMessage: 'Clock is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  email: {
    in: ['body'],
    errorMessage: 'Email is wrong',
    isEmail: true,
    isEmpty: false
  },
  date: {
    in: ['body'],
    errorMessage: 'Date is wrong',
    isEmpty: false
  },
  time: {
    in: ['body'],
    errorMessage: 'Time is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  }
})

exports.add = function (req, res, next) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  const { date, time, email, clockId, cityId, masterId, name } = req.body
  Customer.findOrCreate({
    where: { email: email },
    defaults: { name: name }
  })
    .then(([user, created]) => {
      req.body = {
        ...req.body,
        customerId: user.get({
          plain: true
        }).id
      }
      return Order.create({
        time: time,
        date: date,
        customerId: req.body.customerId,
        clockId: clockId,
        cityId: cityId,
        masterId: masterId
      })
    })
    .then(result => {
      return Order.findOne({
        where: { id: result.dataValues.id },
        include: [{ all: true }],
        raw: true,
        nest: true
      })
    })
    .then(order => {
      return sendMsg(order)
    })
    .then(order => {
      res.status(201).json(order)
    })
    .catch(() => {
      next(error(400, 'Error add order'))
    })
}
