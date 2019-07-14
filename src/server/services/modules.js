const dbConnectionConfig = require('../db/db-connection-config')
const mysql = require('mysql')

function getConnection () {
  return mysql.createConnection(dbConnectionConfig)
}

module.exports = requestToDB = (query, ...rest) => {
  const connectionDB = getConnection()
  return new Promise((resolve, reject) => {
    connectionDB.connect(() => {
      connectionDB.query(query, ...rest, function (err, result) {
        if (err) throw err
        if (result.length) {
          resolve(result)
        } else {
          reject('Error download data from DB!')
        }
      })
    })
  })
}
