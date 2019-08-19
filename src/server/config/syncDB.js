const City = require('../models/cities.js')
const Clock = require('../models/clocks.js')
const Customer = require('../models/customers.js')
const Master = require('../models/masters.js')
const User = require('../models/users.js')

exports.syncDB = City.sync({ force: true })
  .then(() => {
    return City.create({
      city: 'Dnipro'
    })
  })
  .then(() => {
    return City.create({
      city: 'Uzhgorod'
    })
  })
  .then(() => {
    return Clock.sync({ force: true })
      .then(() => {
        return Clock.create({
          typeClock: 'Small',
          timeRepair: 1
        })
      })
      .then(() => {
        return Clock.create({
          typeClock: 'Medium',
          timeRepair: 2
        })
      })
      .then(() => {
        return Clock.create({
          typeClock: 'Big',
          timeRepair: 3
        })
      })
  })
  .then(() => {
    return Master.sync({ force: true })
      .then(() => {
        return Master.create({
          name: 'Andrey',
          rating: 5,
          cityId: 1
        })
      })
      .then(() => {
        return Master.create({
          name: 'Sergey',
          rating: 5,
          cityId: 2
        })
      })
  })
  .then(()=> {
    User.sync({ force: true })
      .then(() => {
        return User.create({
          email: 'admin@example.com',
          password: 'passwordsecret'
        })
      })
  })
  .then(() => {
    Customer.sync({ force: true })
      .then(() => {
        return Customer.create({
          email: 'alexey@gmail.com',
          name: 'Alexey'
        })
      })
  })








