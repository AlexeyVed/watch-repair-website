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
        console.log(result)
        if (result.length || result.protocol41) {
          resolve(result)
        } else {
          reject('Not Found!')
        }
      })
    })
  })
}
