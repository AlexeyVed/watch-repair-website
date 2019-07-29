const User = require('../models/users.js')

exports.list = function (req, res) {
  User.list()
    .then(result => {
      const json = JSON.stringify(result)
      res.send(json)
    })
}

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

exports.add = function (req, res) {
  const user = new User(req.body)
  user.check()
    .then(() => {
      user.registration()
        .then((result) => {
          User.findOne(result.insertId)
            .then(client => {
              const json = JSON.stringify(client[0])
              res.status(201).send(json)
            })
            .catch(err => {
              res.status(500).send('some broke')
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

exports.update = function (req, res) {
  User.findOne(req.body.idlogin)
    .then(userFromDB => {
      const user = new User(userFromDB[0])
      user.update(req.body)
        .then(result => {
          const json = JSON.stringify(req.body)
          res.send(json)
        })
        .catch(err => {
          res.status(400).send('Error update clock')
        })
    })
}

exports.login = function (req, res) {
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
      res.status(404).send(error)
    })
}

exports.delete = function (req, res) {
  User.delete(req.body.id)
    .then(result => {
      const json = JSON.stringify(req.body)
      res.send(json)
    })
    .catch(err => {
      res.status(400).send('Error delete user')
    })
}
