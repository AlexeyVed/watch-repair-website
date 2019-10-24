const passport = require('../modules/passport.js')
const { checkSchema, validationResult } = require('express-validator')
const config = require('../config/config.js')
const jwt = require('jsonwebtoken')
const error = require('../modules/services.js').makeError

exports.loginValidation = checkSchema({
  email: {
    in: ['body'],
    errorMessage: 'Email is wrong',
    isEmail: true,
    isEmpty: false
  },
  password: {
    in: ['body'],
    isLength: {
      errorMessage: 'Password should be at least 7 chars long',
      options: { min: 5 }
    },
    isEmpty: false
  }
})

exports.login = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  passport.authenticate('login', (err, user, info) => {
    if (err) return next(error(500, err.message))
    if (!user) {
      return next(error(info.code, info.message))
    }
    req.logIn(user, err => {
      if (err) {
        return next(err)
      }
      const token = jwt.sign({ email: user.email }, config.jwt.secret)
      const obj = {
        auth: true,
        token: token,
        user: user,
        exp: Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60
      }
      res.status(200).json(obj)
    })
  })(req, res, next)
}

exports.logout = (req, res, next) => {
  try {
    req.logOut()
    res.send('logout')
  } catch (e) {
    next(error(500, 'Error logout'))
  }
}
