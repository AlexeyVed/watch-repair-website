const service = require('../services/modules.js')

module.exports = class Worker {
  constructor (name, city, rating) {
    this.name = name
    this.city = city
    this.rating = rating
  }

  addWorker () {
    return service.requestToDB(`INSERT INTO workers (name, city, rating) VALUES (?, ?, ?)`, [this.name, this.city, this.rating])
  }

  static getAll () {
    return service.requestToDB(`SELECT * FROM workers`)
  }
}
