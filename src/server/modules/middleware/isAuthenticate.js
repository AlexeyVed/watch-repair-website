const jwt = require('jsonwebtoken')
const config = require('../../config/config.js')
const error = require('../services.js').makeError
const User = require('../../models/users.js')

module.exports = (req, res, next) => {
  const token = req.headers['authorization']
  try {
    const decoded = jwt.verify(token, config.jwt.secret)
    const email = decoded.email || null
    User.findOne({
      where: {
        email: email
      }
    })
      .then(result => {
        if (result === null) {
          return next(error(404, 'Account not found.'))
        }
        next()
      })
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return next(error(404, 'Token is expired'))
    }
    next(error(401, 'Invalid token'))
  }
}
