const { checkSchema, validationResult } = require('express-validator')
const Op = require('sequelize').Op
const Sequelize = require('sequelize')
const { format } = require('date-fns')

const { makeError } = require('../modules/services.js')
const getToday = require('../modules/services.js').getToday
const sendMsg = require('../modules/sendEmail.js').sendSuccessfullyMsg
const Order = require('../models/orders.js')
const Master = require('../models/masters.js')
const Clock = require('../models/clocks.js')
const Customer = require('../models/customers.js')

exports.list = function (req, res, next) {
  Order.findAll({
    include: [ { all: true } ],
    where: !req.query.date ? null : {
      date: {
        [Op.startsWith]: req.query.date
      }
    },
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
        finallyObj.map((order) => {
          order.date = format(new Date(order.date), 'MMMM dd, yyyy')
        })
        return res.json(finallyObj)
      }
      orders.map((order) => {
        order.date = format(new Date(order.date), 'MMMM dd, yyyy')
      })
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
        return next(makeError(404, `Order with id = ${req.params.id} not found!`))
      }
      order.date = format(new Date(order.date), 'MMMM dd, yyyy')
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
  city_id: {
    in: ['body'],
    errorMessage: 'City is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  master_id: {
    in: ['body'],
    errorMessage: 'Master is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  clock_id: {
    in: ['body'],
    errorMessage: 'Clock is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  customer_id: {
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
  const { date, time, customer_id, clock_id, city_id, master_id } = req.body
  Master.findByPk(master_id, {
    raw: true,
    nest: true
  })
    .then(master => {
      if (master.city_id !== city_id) {
        return next(makeError(400, 'Master doesnt work in this town'))
      }
      return Clock.findByPk(clock_id)
    })
    .then(reqClock => {
      const { duration } = reqClock
      return Order.findAll({
        where: {
          master_id,
          city_id,
          date,
          [Op.or]: [
            {
              time: {
                [Op.and]: [
                  { [Op.gt]: time },
                  { [Op.lte]: time + duration }
                ]
              }
            }, {
              time: {
                [Op.and]: [
                  { [Op.lte]: time },
                  { [Op.gte]: Sequelize.literal(`(${time} - duration)`) }
                ]
              }
            }
          ]
        }
      })
    })
    .then(result => {
      if (result.length) {
        return next(makeError(400, 'Master already busy at this time.'))
      }
      return Order.update({
        date,
        time,
        customer_id,
        clock_id,
        city_id,
        master_id
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
        return next(makeError(404, `Order with id = ${req.params.id} not found for update!`))
      }
      order.date = format(new Date(order.date), 'MMMM dd, yyyy')
      res.json(order)
    })
    .catch(() => {
      next(error(400, 'Error update order'))
    })
}

exports.getWorkersValidation = checkSchema({
  city_id: {
    in: ['body'],
    errorMessage: 'City is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  clock_id: {
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
  const { date, clock_id, city_id, time } = req.body
  Clock.findByPk(clock_id)
    .then(clock => {
      const { duration } = clock
      return Order.findAll({
        where: {
          date,
          city_id,
          [Op.or]: [
            {
              time: {
                [Op.and]: [
                  { [Op.gt]: time },
                  { [Op.lte]: time + duration }
                ]
              }
            }, {
              time: {
                [Op.and]: [
                  { [Op.lte]: time },
                  { [Op.gte]: Sequelize.literal(`(${time} - duration)`) }
                ]
              }
            }
          ]
        }
      })
    })
    .then(orders => {
      const arrayIdBusyMaster = orders.map(order => order.master_id)
      return Master.findAll({
        where: {
          city_id,
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
  city_id: {
    in: ['body'],
    errorMessage: 'City is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  master_id: {
    in: ['body'],
    errorMessage: 'Master is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  clock_id: {
    in: ['body'],
    errorMessage: 'Clock is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  customer_id: {
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
  const { date, time, customer_id, clock_id, city_id, master_id } = req.body
  Clock.findByPk(clock_id)
    .then(reqClock => {
      const { duration } = reqClock
      req.body = { ...req.body, duration }
      return Order.findAll({
        where: {
          master_id,
          city_id,
          date,
          [Op.or]: [
            {
              time: {
                [Op.and]: [
                  { [Op.gt]: time },
                  { [Op.lte]: time + duration }
                ]
              }
            }, {
              time: {
                [Op.and]: [
                  { [Op.lte]: time },
                  { [Op.gte]: Sequelize.literal(`(${time} - duration)`) }
                ]
              }
            }
          ]
        },
        raw: true,
        nest: true
      })
    })
    .then(result => {
      if (result.length) {
        return next(makeError(400, 'Master already busy at this time.'))
      }
      return Master.findByPk(master_id)
    })
    .then(master => {
      if (master.city_id !== +city_id) {
        return next(makeError(400, 'Master doesnt work in this town'))
      }
      const { duration } = req.body
      return Order.create({
        time,
        date,
        city_id,
        clock_id,
        customer_id,
        master_id,
        duration
      })
    })
    .then(order => {
      return Order.findOne({
        where: { id: order.id },
        include: [ { all: true } ]
      })
    })
    .then(newOrder => {
      newOrder.date = format(new Date(newOrder.date), 'MMMM dd, yyyy')
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
  city_id: {
    in: ['body'],
    errorMessage: 'City is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  master_id: {
    in: ['body'],
    errorMessage: 'Master is wrong',
    isInt: true,
    toInt: true,
    isEmpty: false
  },
  clock_id: {
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
  const { date, time, email, clock_id, city_id, master_id, name } = req.body
  Clock.findByPk(clock_id)
    .then(reqClock => {
      const { duration } = reqClock
      req.body = { ...req.body, duration }
    })
    .then(() => {
      return Customer.findOrCreate({
        where: { email },
        defaults: { name }
      })
    })
    .then(([user, created]) => {
      const customer = user.get({
        plain: true
      })
      req.body = {
        ...req.body,
        name: customer.name,
        customer_id: customer.id
      }
      const { customer_id, duration } = req.body
      return Order.create({
        time,
        date,
        customer_id,
        clock_id,
        city_id,
        master_id,
        duration
      })
    })
    .then(result => {
      return Order.findOne({
        where: { id: result.get().id },
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
      next(makeError(400, 'Error add order'))
    })
}
