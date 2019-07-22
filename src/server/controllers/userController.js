const User = require('../models/users.js')

exports.getUsers = function (req, res) {
  User.getAll()
    .then(result => {
      res.send(result)
    })
}

exports.registration = function (req, res) {
  const user = new User(req.body)
  user.checkUser()
    .then(() => {
      user.registration()
        .then(() => {
          user.login()
            .then(result => {
              if (result[0].password === req.body.password) {
                res.send(result[0].email)
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

exports.addUser = function (req, res) {
  const user = new User(req.body)
  user.checkUser()
    .then(() => {
      user.registration()
        .then(() => {
          user.login()
            .then(result => {
              res.send(result[0].email)
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

exports.updateUser = function (req, res) {
  const user = new User(req.body)
  user.updateUser()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error update clock')
    })
}

exports.login = function (req, res) {
  const user = new User(req.body)
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

exports.deleteUser = function (req, res) {
  User.deleteUser(req.body.id)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error delete user')
    })
}
