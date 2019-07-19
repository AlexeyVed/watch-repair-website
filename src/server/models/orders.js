const service = require('../services/modules.js')

module.exports = class Order {
  constructor (masterID, clientName, clientEmail, timeRepair, city, date, time, id) {
    this.id = id
    this.masterID = masterID
    this.clientName = clientName
    this.clientEmail = clientEmail
    this.timeRepair = timeRepair
    this.city = city
    this.date = date
    this.time = time
  }

  addOrderWithoutMaster () {
    const values = [this.clientName, this.clientEmail, this.timeRepair, this.city, this.date, this.time]
    return service.requestToDB(`INSERT INTO orders (clientName, clientEmail, timeRepair, city, date, time) VALUES (?, ?, ?, ?, ?, ?)`, values)
  }

  addOrderAdmin () {
    const values = [this.clientName, this.clientEmail, this.timeRepair, this.city, this.date, this.time, this.masterID]
    return service.requestToDB(`INSERT INTO orders (clientName, clientEmail, timeRepair, city, date, time, masterID) VALUES (?, ?, ?, ?, ?, ?, ?)`, values)
  }

  updateOrder () {
    const values = [this.clientName, this.clientEmail, this.timeRepair, this.city, this.date, this.time, this.masterID, this.id]
    return service.requestToDB(`UPDATE orders SET clientName = ?, clientEmail = ?, timeRepair = ?, city = ?, date = ?, time = ?, masterID = ? WHERE id = ?`, values)
  }

  static addOrder (masterID, id) {
    return service.requestToDB(`UPDATE orders SET masterID = ? WHERE id = ?`, [masterID, id])
  }

  getIdBusyMasters () {
    return service.requestToDB(`SELECT masterID, timeRepair, time FROM orders WHERE date = '${this.date}' AND city = '${this.city}'`)
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

  static deleteOrder (id) {
    return service.requestToDB(`DELETE FROM orders WHERE id = ?`, [id])
  }

  static getAll () {
    return service.requestToDB(`SELECT * FROM orders`)
  }
}
