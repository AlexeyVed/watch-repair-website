const service = require('../services/modules.js')

module.exports = class City {
  constructor (city) {
    this.city = city
  }

  addCity () {
    return service.requestToDB(`INSERT INTO cities (city) VALUES (?)`, [this.city])
  }

  static deleteCity (id) {
    return service.requestToDB(`DELETE FROM cities WHERE id = ?`, [id])
  }

  static getAll () {
    return service.requestToDB(`SELECT * FROM cities`)
  }
}
