const service = require('../services/modules.js')

module.exports = class City {
  constructor (values) {
    this.values = values
  }

  update (values) {
    this.values = values
    const { city, id } = this.values
    return service.requestToDB(`UPDATE cities SET city = ? WHERE id = ?`, [city, id])
  }

  add () {
    const { city } = this.values
    return service.requestToDB(`INSERT INTO cities (city) VALUES (?)`, [city])
  }

  static delete (id) {
    return service.requestToDB(`DELETE FROM cities WHERE id = ?`, [id])
  }

  static findOne (id) {
    return service.requestToDB(`SELECT * FROM cities WHERE id = ?`, [id])
  }

  static list () {
    return service.requestToDB(`SELECT * FROM cities`)
  }
}
