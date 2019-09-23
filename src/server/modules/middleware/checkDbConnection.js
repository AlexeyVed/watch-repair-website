const db = require('../../db/db-connection-config.js')

module.exports = function (req, res, next) {
  return db
    .authenticate()
    .then(() => {
      next()
    })
    .catch(err => {
      if (err) {
        return res.status(500).json('Miss connection to database.')
      }
    })
}
