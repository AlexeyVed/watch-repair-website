const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users.js')

passport.use('login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      session: false
    },
    (email, password, done) => {
      try {
        User.findOne({
          where: {
            email: email
          }
        })
          .then(dbUser => {
            const json = JSON.stringify(dbUser)
            const user = JSON.parse(json)
            if (!user) {
              return done(null, false, {
                code: 404,
                message: 'User not found.'
              })
            } else if (!User.validPassword(password, user.password)) {
              return done(null, false, {
                code: 422,
                message: 'Wrong password.'
              })
            }
            return done(null, user)
          })
      } catch (err) {
        done(err)
      }
    }
  ))

module.exports = passport