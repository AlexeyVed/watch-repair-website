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

/*
connectionDB.query('UPDATE tbperson SET firstName = ?, lastName = ?, age = ? WHERE personID = ? AND loginID = ?', values, function (err, result) {
  if (err) {
    console.log(err, 'err in 236')
    return reject(err.sqlMessage);
  }
  resolve();
  console.log(result);
});*/
