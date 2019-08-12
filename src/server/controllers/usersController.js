const passport = require('../config/passport.js')
const jwtConfig = require('../config/jwt.js').jwtConfig
const jwt = require('jsonwebtoken')
const User = require('../models/users.js')

exports.login = (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.send(info.message)
    req.logIn(user, err => {
      User.findOne({
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
          const json = JSON.stringify(obj)
          res.status(200).send(json)
        })
    })
  })(req, res, next)
}

exports.logout = (req, res, next) => {
  req.logOut()
  res.send('logout')
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
