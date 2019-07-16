const service = require('../services/modules.js')

module.exports = class Worker {
  constructor (name, city, rating, id) {
    this.id = id || null
    this.name = name
    this.city = city
    this.rating = rating
  }

  updateWorker () {
    return service.requestToDB(`UPDATE workers SET name = ?, city = ?, rating = ?  WHERE idworker = ?`, [this.name, this.city, this.rating, this.id])
  }

  addWorker () {
    return service.requestToDB(`INSERT INTO workers (name, city, rating) VALUES (?, ?, ?)`, [this.name, this.city, this.rating])
  }

  static deleteWorker (idworker) {
    return service.requestToDB(`DELETE FROM workers WHERE idworker = ?`, [idworker])
  }

  static getAll () {
    return service.requestToDB(`SELECT * FROM workers`)
  }
}
