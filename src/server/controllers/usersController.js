const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users.js')
/*
passport.use(new LocalStrategy(
  function (username, password, done) {
  console.log('passport before findOne')
  User.findOne({ username: username }, function (err, user) {
    if (err) { return done(err) }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' })
    }
    if (!user.validPassword(password)) {
      return done(null, false, { message: 'Incorrect password.' })
    }
    return done(null, user)
  })
}
)) */

exports.login = function (req, res) {
  res.send(req.user)
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
