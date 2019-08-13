const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const token = req.headers['authorization']
  try {
    const decoded = jwt.verify(token, 'secret_word')
    if (decoded.email) {
      next()
    }
  } catch (err) {
    res.redirect('/')
  }
}
