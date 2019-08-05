const User = require('../models/users.js')

exports.registration = function (req, res) {
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
}

exports.login = function (req, res) {
  console.log(req.body)
  const user = new User(req.body)
  user.login()
    .then(result => {
      if (result[0].password === req.body.password) {
        const json = JSON.stringify(result[0].email)
        res.send(json)
      } else {
        res.status(422).send('Invalid pass')
      }
    })
    .catch(error => {
      res.status(404).send('User not found!')
    })
}
