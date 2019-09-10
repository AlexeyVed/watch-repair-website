const passport = require('../modules/passport.js')
const { checkSchema, validationResult } = require('express-validator')
const prodConfig = require('../config/prodConfig.js').jwt
const devConfig = require('../config/devConfig.js').jwt
const jwt = require('jsonwebtoken')
const error = require('../modules/services.js').makeError
const User = require('../models/users.js')

const isProd = process.env.NODE_ENV || 'development'
const jwtConfig = (isProd === 'production') ? prodConfig : devConfig

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
      return User.findOne({
        where: {
          email: user.email
        }
      })
        .then(user => {
          const token = jwt.sign({ email: user.email }, jwtConfig.secret)
          const obj = {
            auth: true,
            token: token,
            user: user,
            exp: Math.floor(new Date().getTime() / 1000) + 24 * 60 * 60
          }
          res.status(200).json(obj)
        })
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

/* exports.registration = function (req, res) {
  const user = new User(req.body)
  user.check()
    .then(() => {
      user.registration()
        .then(() => {
          user.login()
            .then(result => {
              if (result[0].password === req.body.password) {
                const json = JSON.stringify(result[0].email)
                res.send(json)
              }
            })
        })
        .catch(error => {
          res.status(400).send(error)
        })
    })
    .catch(error => {
      res.status(401).send('Email already used.')
    })
} */
