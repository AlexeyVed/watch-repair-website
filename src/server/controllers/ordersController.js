const { check, validationResult } = require('express-validator')
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
    ]
  })
    .then(orders => {
      const string = JSON.stringify(orders)
      const obj = JSON.parse(string)
      const today = getToday()
      const indexToday = obj.findIndex((elem, index, array) => {
        const x = elem.date.split('-')
        return (Number(x[0]) >= today.year && Number(x[1]) >= today.month)
          ? (Number(x[2]) >= today.day) ? elem.time >= today.hour : false : false
      })
      if (indexToday !== -1) {
        const oldOrders = obj.splice(0, indexToday)
        const finallyObj = obj.concat(oldOrders)
        return res.json(finallyObj)
      }
      res.json(orders)
    })
    .catch(err => {
      next(error(400, 'Error get list of orders'))
    })
}

exports.getValidation = [
  check('id').isNumeric().not().isEmpty()
]

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
      res.json(order)
    })
    .catch(err => {
      next(error(400, 'Error get order'))
    })
}

exports.removeValidation = [
  check('id').isNumeric().not().isEmpty()
]

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
    .catch(err => {
      next(error(400, 'Error delete order'))
    })
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
  const { date, time, customerId, clockId, cityId, masterId } = req.body
  Master.findByPk(masterId)
    .then(master => {
      const stringMaster = JSON.stringify(master)
      const objMaster = JSON.parse(stringMaster)
      if (objMaster.cityId !== +cityId) {
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
      res.json(order)
    })
    .catch(err => {
      next(error(400, 'Error update order'))
    })
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
    .catch(err => {
      next(error(400, 'Error get free workers'))
    })
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
        include: [{ model: Clock }]
      })
    })
    .then(result => {
      const string = JSON.stringify(result)
      const obj = JSON.parse(string)
      const isCreated = obj.filter(order => {
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
      const stringMaster = JSON.stringify(master)
      const objMaster = JSON.parse(stringMaster)
      if (objMaster.cityId !== +cityId) {
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
    .catch(err => {
      next(error(400, 'Error create order'))
    })
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
      const string = JSON.stringify(result)
      const obj = JSON.parse(string)
      console.log('result order', obj)
      return Order.findOne({
        where: { id: obj.id },
        include: [{ all: true }]
      })
    })
    .then(order => {
      const string = JSON.stringify(order)
      const obj = JSON.parse(string)
      console.log('result order include', obj)
      return sendMsg(obj)
    })
    .then(order => {
      res.status(201).json(order)
    })
    .catch(err => {
      next(error(400, 'Error add order'))
    })
}
