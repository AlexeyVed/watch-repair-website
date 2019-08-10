const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const User = require('../models/users.js')

passport.use(new LocalStrategy(
  {
    usernameField: 'email'
  },
  (email, password, done) => {
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
            message: 'Incorrect email.'
          })
        } else if (!User.validPassword(password, user.password)) {
          return done(null, false, {
            message: 'Incorrect password.'
          })
        }
        return done(null, user)
      })
  }
))

passport.serializeUser((user, cb) => {
  cb(null, user)
})

passport.deserializeUser((obj, cb) => {
  cb(null, obj)
})

module.exports = passport
