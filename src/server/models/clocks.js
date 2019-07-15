const service = require('../services/modules.js')

module.exports = class Clock {
  constructor (typeClock, timeRepair) {
    this.typeClock = typeClock,
    this.timeRepair = timeRepair
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

/*
connectionDB.query(`DELETE FROM tbperson WHERE personID = ? AND loginID = ?`, values, function (err, result) {
  console.log(err, 'deleting errors')
  if (err) {
    return reject(err.sqlMessage)
  }
  resolve()
  console.log(result)
})
*/
