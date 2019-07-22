const service = require('../services/modules.js')

module.exports = class Order {
  constructor (values) {
    this.values = values
  }

  addOrderWithoutMaster () {
    const { clientName, clientEmail, timeRepair, city, date, time } = this.values
    const values = [clientName, clientEmail, timeRepair, city, date, time]
    return service.requestToDB(`INSERT INTO orders (clientName, clientEmail, timeRepair, city, date, time) VALUES (?, ?, ?, ?, ?, ?)`, values)
  }

  addOrderAdmin () {
    const { clientName, clientEmail, timeRepair, city, date, time, masterID } = this.values
    const values = [clientName, clientEmail, timeRepair, city, date, time, masterID]
    return service.requestToDB(`INSERT INTO orders (clientName, clientEmail, timeRepair, city, date, time, masterID) VALUES (?, ?, ?, ?, ?, ?, ?)`, values)
  }

  updateOrder () {
    const { clientName, clientEmail, timeRepair, city, date, time, masterID, id } = this.values
    const values = [clientName, clientEmail, timeRepair, city, date, time, masterID, id]
    return service.requestToDB(`UPDATE orders SET clientName = ?, clientEmail = ?, timeRepair = ?, city = ?, date = ?, time = ?, masterID = ? WHERE id = ?`, values)
  }

  static addOrder (values) {
    const { masterID, id } = values
    return service.requestToDB(`UPDATE orders SET masterID = ? WHERE id = ?`, [masterID, id])
  }

  getIdBusyMasters () {
    const { date, city } = this.values
    return service.requestToDB(`SELECT masterID, timeRepair, time FROM orders WHERE date = '${date}' AND city = '${city}'`)
      .then(workers => {
        return workers.filter(item => {
          if (item.time < this.time) {
            if ((item.time + item.timeRepair) < this.time) {
              return false
            } else {
              return true
            }
          } else {
            if ((this.time + this.timeRepair) >= item.time) {
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

  static deleteOrder (obj) {
    const { id } = obj
    return service.requestToDB(`DELETE FROM orders WHERE id = ?`, [id])
  }

  static getAll () {
    return service.requestToDB(`SELECT * FROM orders`)
  }
}
