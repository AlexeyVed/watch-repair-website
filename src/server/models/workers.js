const service = require('../services/modules.js')

module.exports = class Worker {
  constructor (values) {
    this.values = values
  }

  update (values) {
    this.values = values
    const { name, city, rating, id } = this.values
    const val = [ name, city, rating, id ]
    return service.requestToDB(`UPDATE workers SET name = ?, city = ?, rating = ?  WHERE id = ?`, val)
  }

  add () {
    const { name, city, rating } = this.values
    const values = [ name, city, rating ]
    return service.requestToDB(`INSERT INTO workers (name, city, rating) VALUES (?, ?, ?)`, values)
  }

  static delete (id) {
    return service.requestToDB(`DELETE FROM workers WHERE id = ?`, [id])
  }

  static getWithoutBusy (arrayId, obj) {
    const { city } = obj
    let sql = ''
    for (let i = 0; i < arrayId.length; i++) {
      sql += ` && id != '${arrayId[i]}'`
    }
    return service.requestToDB(`SELECT * FROM workers WHERE city = '${city}'${sql}`)
  }

  static findOne (id) {
    return service.requestToDB(`SELECT * FROM workers WHERE id = ?`, [id])
  }

  static list () {
    return service.requestToDB(`SELECT * FROM workers`)
  }
}
