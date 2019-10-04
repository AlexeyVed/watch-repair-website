const jwt = require('jsonwebtoken')
const config = require('../../config/config.js')

module.exports = (req, res, next) => {
  const token = req.headers['authorization']
  try {
    const decoded = jwt.verify(token, config.jwt.secret)
    if (decoded.email) {
      next()
    }
  } catch (err) {
    res.status(401).send('Auth failed')
  }
}
