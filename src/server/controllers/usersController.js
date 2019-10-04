const passport = require('../modules/passport.js')
const { checkSchema, validationResult } = require('express-validator')
const config = require('../config/config.js')
const jwt = require('jsonwebtoken')
const error = require('../modules/services.js').makeError
const User = require('../models/users.js')

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
      return User.findOne({
        where: {
          email: user.email
        }
      })
        .then(user => {
          const token = jwt.sign({ email: user.email, exp: Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60 }, config.jwt.secret)
          const obj = {
            auth: true,
            token: token,
            user: user
          }
          res.status(200).json(obj)
        })
    })
  })(req, res, next)
}

exports.authValidation = checkSchema({
  email: {
    in: ['body'],
    errorMessage: 'Email is wrong',
    isEmail: true,
    isEmpty: false
  }
})

exports.authAdmin = function (req, res, next) {
  console.log('auth started')
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return next(error(422, null, errors.array()))
  }
  console.log('auth validation done')
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(result => {
      console.log('auth check with db')
      if (result === null) {
        return next(error(404, 'User not found.'))
      }
      const token = req.headers['authorization']
      const decoded = jwt.verify(token, config.jwt.secret)
      if (decoded.email === result.get().email) {
        return res.status(200).send('Access is allowed')
      } else {
        next(error(400, 'Access denied.'))
      }
    })
    .catch(() => {
      next(error(400, 'Access denied.'))
    })
}

exports.logout = (req, res, next) => {
  try {
    req.logOut()
    res.send('logout')
  } catch (e) {
    next(error(500, 'Error logout'))
  }
}
