const Sequelize = require('sequelize')
const sequelize = require('../db/db-connection-config.js')
const Customer = require('./cities.js')
const Clock = require('./cities.js')
const City = require('./cities.js')
const Master = require('./cities.js')

module.exports = sequelize.define('orders', {
  customerID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Customer,
      key: 'id'
    }
  },
  clockID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Clock,
      key: 'id'
    }
  },
  cityID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: City,
      key: 'id'
    }
  },
  date: {
    type: Sequelize.STRING(191),
    allowNull: false
  },
  time: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  masterID: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Master,
      key: 'id'
    }
  }
})

/*
const service = require('../services/modules.js')

module.exports = class Order {
  constructor (values) {
    this.values = values
  }

  add () {
    const { customerID, clockID, cityID, date, time, masterID } = this.values
    const values = [customerID, clockID, cityID, date, time, masterID ]
    return service.requestToDB(`INSERT INTO orders (customerID, clockID, cityID, date, time, masterID) VALUES (?, ?, ?, ?, ?, ?)`, values)
  }

  addAdmin () {
    const { customerID, clockID, cityID, date, time, masterID } = this.values
    const values = [customerID, clockID, cityID, date, time, masterID ]
    return service.requestToDB(`INSERT INTO orders (customerID, clockID, cityID, date, time, masterID) VALUES (?, ?, ?, ?, ?, ?)`, values)
  }

  update (values) {
    this.values = values
    const { customerID, clockID, cityID, date, time, masterID, id } = this.values
    const val = [customerID, clockID, cityID, date, time, masterID, id]
    return service.requestToDB(`UPDATE orders SET customerID = ?, clockID = ?, cityID = ?, date = ?, time = ?, masterID = ? WHERE id = ?`, val)
  }

  getIdBusyMasters () {
    const { date, cityID, time, timeRepair } = this.values
    return service.requestToDB(`
    SELECT
    orders.masterID, clocks.timeRepair, orders.time
    FROM
    orders
    LEFT JOIN clocks ON orders.clockID = clocks.id
    WHERE date = '${date}' AND cityID = '${cityID}'`)
      .then(workers => {
        return workers.filter(item => {
          if (item.time < time) {
            if ((item.time + item.timeRepair) < time) {
              return false
            } else {
              return true
            }
          } else {
            if ((time + timeRepair) >= item.time) {
              return true
            } else {
              return false
            }
          }
        })
      })
      .then(busyMasters => {
        return busyMasters.map(master => master.masterID)
      })
      .then(idBusyMasters => {
        const result = []

        nextInput:
        for (let i = 0; i < idBusyMasters.length; i++) {
          for (let j = 0; j < result.length; j++) {
            if (result[j] === idBusyMasters[i]) continue nextInput
          }
          result.push(idBusyMasters[i])
        }
        return result
      })
      .catch(err => {
        res.status(500).send('Error get id busy masters')
      })
  }

  static findOne (id) {
    return service.requestToDB(`SELECT
    orders.id, orders.date, orders.time,
    customers.name as customerName, customers.email as customerEmail,customers.id as customerID,
    workers.id as masterID, workers.name as workerName,
    clocks.timeRepair, clocks.typeClock, clocks.id as clockID,
    cities.city, cities.id as cityID
    FROM
     orders
    LEFT JOIN customers ON orders.customerID = customers.id
    LEFT JOIN clocks ON orders.clockID = clocks.id
    LEFT JOIN cities ON orders.cityID = cities.id
    LEFT JOIN workers ON orders.masterID = workers.id
    WHERE orders.id = ?`, [id])
  }

  static delete (id) {
    return service.requestToDB(`DELETE FROM orders WHERE id = ?`, [id])
  }

  static list () {
    return service.requestToDB(`
    SELECT
    orders.id, orders.date, orders.time,
    customers.name as customerName, customers.email as customerEmail,
    workers.name as workerName,
    clocks.typeClock,
    cities.city
    FROM
     orders
    LEFT JOIN customers ON orders.customerID = customers.id
    LEFT JOIN clocks ON orders.clockID = clocks.id
    LEFT JOIN cities ON orders.cityID = cities.id
    LEFT JOIN workers ON orders.masterID = workers.id`)
  }
}
*/
