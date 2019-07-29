const service = require('../services/modules.js')

module.exports = class Worker {
  constructor (values) {
    this.values = values
  }

  update (values) {
    this.values = values
    const { name, city, rating, idworker } = this.values
    const val = [ name, city, rating, idworker ]
    return service.requestToDB(`UPDATE workers SET name = ?, city = ?, rating = ?  WHERE idworker = ?`, val)
  }

  add () {
    const { name, city, rating } = this.values
    const values = [ name, city, rating ]
    return service.requestToDB(`INSERT INTO workers (name, city, rating) VALUES (?, ?, ?)`, values)
  }

  static delete (idworker) {
    return service.requestToDB(`DELETE FROM workers WHERE idworker = ?`, [idworker])
  }

  static getWithoutBusy (arrayId, obj) {
    const { city } = obj
    let sql = ''
    for (let i = 0; i < arrayId.length; i++) {
      sql += ` && idworker != '${arrayId[i]}'`
    }
    return service.requestToDB(`SELECT * FROM workers WHERE city = '${city}'${sql}`)
  }

  static findOne (idworker) {
    return service.requestToDB(`SELECT * FROM workers WHERE idworker = ?`, [idworker])
  }

  static list () {
    return service.requestToDB(`SELECT * FROM workers`)
  }
}
