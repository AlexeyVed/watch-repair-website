const jwt = require('jsonwebtoken')
const config = require('../../config/config.js')
const error = require('../services.js').makeError

module.exports = (req, res, next) => {
  const token = req.headers['authorization']
  try {
    const decoded = jwt.verify(token, config.jwt.secret)
    if (decoded.email) {
      next()
    }
  } catch (err) {
    if (err.name === 'JsonWebTokenError') {
      return next(error(401, `Error get data. Reason: ${err.message}.`))
    }
    next(err)
  }
}
