const passport = require('../config/passport')
const User = require('../models/users.js')

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.send(info.message)
    req.logIn(user, err => {
      if (err) { return next(err) }
      res.send(req.user)
    })
  })(req, res, next)
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
