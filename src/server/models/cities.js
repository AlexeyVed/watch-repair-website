const service = require('../services/modules.js')

module.exports = class City {
  constructor (city, id) {
    this.id = id || null
    this.city = city
  }

  updateCity () {
    return service.requestToDB(`UPDATE cities SET city = ? WHERE id = ?`, [this.city, this.id])
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
