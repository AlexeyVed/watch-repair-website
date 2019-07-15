const User = require('../models/users.js')

exports.getUsers = function (req, res) {
  User.getAll()
    .then(result => {
      res.send(result)
    })
}

exports.registration = function (req, res) {
  const user = new User(req.body.email, req.body.password)
  user.registration()
    .then(() => {
      user.login()
        .then(result => {
          if (result[0].password === req.body.password) {
            res.send(result[0].email)
          }
        })
        .catch(error => {
          res.status(404).send(error)
        })
    })
    .catch(error => {
      console.log(error)
    })
}

exports.login = function (req, res) {
  const user = new User(req.body.email, req.body.password)
  user.login()
    .then(result => {
      if (result[0].password === req.body.password) {
        res.send(result[0].email)
      } else {
        res.status(422).send('Invalid pass')
      }
    })
    .catch(error => {
      res.status(404).send(error)
    })
}
