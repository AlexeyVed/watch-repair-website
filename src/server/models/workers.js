const service = require('../services/modules.js')

module.exports = class Worker {
  constructor (values) {
    this.values = values
  }

  update (values) {
    this.values = values
    const { name, cityID, rating, id } = this.values
    const val = [ name, cityID, rating, id ]
    return service.requestToDB(`UPDATE workers SET name = ?, cityID = ?, rating = ?  WHERE id = ?`, val)
  }

  add () {
    const { name, cityID, rating } = this.values
    const values = [ name, cityID, rating ]
    return service.requestToDB(`INSERT INTO workers (name, cityID, rating) VALUES (?, ?, ?)`, values)
  }

  static delete (id) {
    return service.requestToDB(`DELETE FROM workers WHERE id = ?`, [id])
  }

  static getWithoutBusy (arrayId, obj) {
    const { cityID } = obj
    let sql = ''
    for (let i = 0; i < arrayId.length; i++) {
      sql += ` && id != '${arrayId[i]}'`
    }
    return service.requestToDB(`SELECT * FROM workers WHERE cityID = '${cityID}'${sql}`)
  }

  static findOne (id) {
    return service.requestToDB(`SELECT 
    workers.id, workers.name, workers.cityID, workers.rating,
    cities.city
    FROM
     workers
    LEFT JOIN cities ON workers.cityID = cities.id
    WHERE workers.id = ?`, [id])
  }

  static list () {
    return service.requestToDB(`SELECT
     workers.id, workers.name, workers.cityID, workers.rating,
     cities.city
     FROM
      workers
     LEFT JOIN cities ON workers.cityID = cities.id`)
  }
}
