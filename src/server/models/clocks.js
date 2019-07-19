const service = require('../services/modules.js')

module.exports = class Clock {
  constructor (typeClock, timeRepair, id) {
    this.id = id || null
    this.typeClock = typeClock,
    this.timeRepair = timeRepair
  }

  updateClock () {
    return service.requestToDB(`UPDATE clocks SET typeClock = ?, timeRepair = ?  WHERE id = ?`, [this.typeClock, this.timeRepair, this.id])
  }

  addClock () {
    return service.requestToDB(`INSERT INTO clocks (typeClock, timeRepair) VALUES (?, ?)`, [this.typeClock, this.timeRepair])
  }

  static deleteClock (id) {
    return service.requestToDB(`DELETE FROM clocks WHERE id = ?`, [id])
  }

  static getAll () {
    return service.requestToDB(`SELECT * FROM clocks`)
  }
}
