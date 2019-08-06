const service = require('../services/modules.js')

module.exports = class Order {
  constructor (values) {
    this.values = values
  }

  addWithoutMaster () {
    const { clientName, clientEmail, timeRepair, city, date, time } = this.values
    const values = [clientName, clientEmail, timeRepair, city, date, time]
    return service.requestToDB(`INSERT INTO orders (clientName, clientEmail, timeRepair, city, date, time) VALUES (?, ?, ?, ?, ?, ?)`, values)
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

  static add (values) {
    const { idMaster, id } = values
    return service.requestToDB(`UPDATE orders SET masterID = ? WHERE id = ?`, [idMaster, id])
  }

  getIdBusyMasters () {
    const { date, city, time, timeRepair } = this.values
    return service.requestToDB(`SELECT masterID, timeRepair, time FROM orders WHERE date = '${date}' AND city = '${city}'`)
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
