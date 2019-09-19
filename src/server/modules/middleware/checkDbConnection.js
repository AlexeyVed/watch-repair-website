const db = require('../../db/db-connection.js')

module.exports = function (req, res, next) {
  return db
    .authenticate()
    .then(() => {
      next()
    })
    .catch(err => {
      if (err) {
        return next(err)
      }
      return res.status(500).json('Miss connection to database.')
    })
}
