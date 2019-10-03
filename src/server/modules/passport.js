const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users.js')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findByPk(id)
    .then(user => {
      if (user === null) {
        done(null, false)
      }
      done(null, user)
    })
    .catch(error => {
      done(error)
    })
})

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
            const user = dbUser.get()
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
