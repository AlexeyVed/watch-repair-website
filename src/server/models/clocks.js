const service = require('../services/modules.js')

module.exports = class Clock {
  constructor (values) {
    this.values = values
  }

  updateClock () {
    const { typeClock, timeRepair, id } = this.values
    return service.requestToDB(`UPDATE clocks SET typeClock = ?, timeRepair = ?  WHERE id = ?`, [typeClock, timeRepair, id])
  }

  addClock () {
    const { typeClock, timeRepair } = this.values
    return service.requestToDB(`INSERT INTO clocks (typeClock, timeRepair) VALUES (?, ?)`, [typeClock, timeRepair])
  }

  static deleteClock (id) {
    return service.requestToDB(`DELETE FROM clocks WHERE id = ?`, [id])
  }

  static getAll () {
    return service.requestToDB(`SELECT * FROM clocks`)
  }
}
