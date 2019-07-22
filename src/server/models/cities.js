const service = require('../services/modules.js')

module.exports = class City {
  constructor (values) {
    this.values = values
  }

  updateCity () {
    const { city, id } = this.values
    return service.requestToDB(`UPDATE cities SET city = ? WHERE id = ?`, [city, id])
  }

  addCity () {
    const { city } = this.values
    return service.requestToDB(`INSERT INTO cities (city) VALUES (?)`, [city])
  }

  deleteCity () {
    const { id } = this.values
    return service.requestToDB(`DELETE FROM cities WHERE id = ?`, [id])
  }

  static getAll () {
    return service.requestToDB(`SELECT * FROM cities`)
  }
}
