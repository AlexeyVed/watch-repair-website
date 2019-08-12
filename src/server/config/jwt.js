const jwt = require('jsonwebtoken')

exports.jwtConfig = {
  secret: 'secret_word'
}

exports.isAuthenticate = (req, res, next) => {
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
