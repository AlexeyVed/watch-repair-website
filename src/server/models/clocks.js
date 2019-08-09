const Sequelize = require('sequelize')
const sequelize = require('../db/db-connection-config.js')

module.exports = sequelize.define('clocks', {
  typeClock: {
    type: Sequelize.STRING(191),
    allowNull: false
  },
  timeRepair: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

/*
module.exports = class Clock {
  constructor (values) {
    this.values = values
  }

  update (values) {
    this.values = values
    const { typeClock, timeRepair, id } = this.values
    return service.requestToDB(`UPDATE clocks SET typeClock = ?, timeRepair = ?  WHERE id = ?`, [typeClock, timeRepair, id])
  }

  add () {
    const { typeClock, timeRepair } = this.values
    return service.requestToDB(`INSERT INTO clocks (typeClock, timeRepair) VALUES (?, ?)`, [typeClock, timeRepair])
  }

  static findOne (id) {
    return service.requestToDB(`SELECT * FROM clocks WHERE id = ?`, [id])
  }

  static delete (id) {
    return service.requestToDB(`DELETE FROM clocks WHERE id = ?`, [id])
  }

  static list () {
    return service.requestToDB(`SELECT * FROM clocks`)
  }
}
*/
