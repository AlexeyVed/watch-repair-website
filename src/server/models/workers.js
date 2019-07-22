const service = require('../services/modules.js')

module.exports = class Worker {
  constructor (values) {
    this.values = values
  }

  updateWorker () {
    const { name, city, rating, id } = this.values
    const values = [ name, city, rating, id ]
    return service.requestToDB(`UPDATE workers SET name = ?, city = ?, rating = ?  WHERE idworker = ?`, values)
  }

  addWorker () {
    const { name, city, rating } = this.values
    const values = [ name, city, rating ]
    return service.requestToDB(`INSERT INTO workers (name, city, rating) VALUES (?, ?, ?)`, values)
  }

  static deleteWorker (idworker) {
    return service.requestToDB(`DELETE FROM workers WHERE idworker = ?`, [idworker])
  }

  static getWorkersWithoutBusy (arrayId, obj) {
    const { city } = obj
    let sql = ''
    for (let i = 0; i < arrayId.length; i++) {
      sql += ` && idworker != '${arrayId[i]}'`
    }
    return service.requestToDB(`SELECT * FROM workers WHERE city = '${city}'${sql}`)
  }

  static getAll () {
    return service.requestToDB(`SELECT * FROM workers`)
  }
}
