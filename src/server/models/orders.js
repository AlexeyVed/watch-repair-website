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

  addOrder () {
    const values = [this.clientName, this.clientEmail, this.timeRepair, this.city, this.date, this.time]
    return service.requestToDB(`INSERT INTO orders (clientName, clientEmail, timeRepair, city, date, time) VALUES (?, ?, ?, ?, ?, ?)`, values)
  }

  static getAll () {
    return service.requestToDB(`SELECT * FROM orders`)
  }
}
