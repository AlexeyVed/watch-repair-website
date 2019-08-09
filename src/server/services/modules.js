const pool = require('../db/db-connection-config')

exports.requestToDBCheck = (query, ...rest) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        throw err
      }
      conn.query(query, ...rest, function (err, result) {
        if (err) {
          throw err
        }
        if (result.length) {
          reject()
        } else {
          resolve()
        }
      })
    })
  })
}

exports.requestToDB = (query, ...rest) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, conn) => {
      if (err) {
        throw err
      }
      conn.query(query, ...rest, function (err, result) {
        if (err) {
          throw err
        }

        if (result.length || result.protocol41) {
          resolve(result)
        } else {
          resolve([])
        }
      })
    })
  })
}
