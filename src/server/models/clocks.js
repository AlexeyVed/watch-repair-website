const service = require('../services/modules.js')

module.exports = class Clock {
  constructor (typeClock, timeRepair) {
    this.typeClock = typeClock,
    this.timeRepair = timeRepair
  }

  addClock () {
    return service.requestToDB(`INSERT INTO clocks (typeClock, timeRepair) VALUES (?, ?)`, [this.typeClock, this.timeRepair])
  }

  static getAll () {
    return service.requestToDB(`SELECT * FROM clocks`)
  }
}
