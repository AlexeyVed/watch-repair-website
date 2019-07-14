const User = require('../models/users.js')

exports.getUsers = function (req, res) {
  User.getAll()
    .then(result => {
      res.send(result)
    })
}

exports.login = function (req, res) {
  const user = new User(req.body.email, req.body.password)
  user.login()
    .then(result => {
      if (result) {
        res.send(result[0].email)
      }
    })
    .catch(error => {
      res.status(404).send(error)
    })
}
