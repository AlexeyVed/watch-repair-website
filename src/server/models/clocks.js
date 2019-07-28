const service = require('../services/modules.js')

module.exports = class Clock {
  constructor (values) {
    this.values = values
  }

  update () {
    const { typeClock, timeRepair, id } = this.values
    return service.requestToDB(`UPDATE clocks SET typeClock = ?, timeRepair = ?  WHERE id = ?`, [typeClock, timeRepair, id])
  }

  add () {
    const { typeClock, timeRepair } = this.values
    return service.requestToDB(`INSERT INTO clocks (typeClock, timeRepair) VALUES (?, ?)`, [typeClock, timeRepair])
  }

  static delete (id) {
    return service.requestToDB(`DELETE FROM clocks WHERE id = ?`, [id])
  }

  static list () {
    return service.requestToDB(`SELECT * FROM clocks`)
  }
}
