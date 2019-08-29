const City = require('../models/cities.js')
const Clock = require('../models/clocks.js')
const Customer = require('../models/customers.js')
const Master = require('../models/masters.js')
const User = require('../models/users.js')
const Order = require('../models/orders.js')

exports.syncDB = City.sync({ force: false })
  .then(() => {
    return Clock.sync({ force: false })
  })
  .then(() => {
    return Master.sync({ force: false })
  })
  .then(() => {
    return User.sync({ force: false })
  })
  .then(() => {
    return Customer.sync({ force: false })
  })
  .then(() => {
    return Order.sync({ force: false })
  })
  .then(() => {
    return Promise.all([
      City.findOrCreate({
        where: {
          city: 'Dnipro'
        }
      }),
      City.findOrCreate({
        where: {
          city: 'Uzhgorod'
        }
      }),
      Clock.findOrCreate({
        where: {
          typeClock: 'Small'
        },
        defaults: {
          timeRepair: 1
        }
      }),
      Clock.findOrCreate({
        where: {
          typeClock: 'Medium'
        },
        defaults: {
          timeRepair: 2
        }
      }),
      Clock.findOrCreate({
        where: {
          typeClock: 'Big'
        },
        defaults: {
          timeRepair: 3
        }
      }),
      User.findOrCreate({
        where: {
          email: 'admin@example.com'
        },
        defaults: {
          password: 'passwordsecret'
        }
      }),
      Customer.findOrCreate({
        where: {
          email: 'alexey@gmail.com'
        },
        defaults: {
          name: 'Alexey'
        }
      })
    ])
  })
  .catch(err => {
    console.log(err)
  })
