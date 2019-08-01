const Clock = require('../models/clocks.js')

exports.list = function (req, res) {
  Clock.list()
    .then(result => {
      const json = JSON.stringify(result)
      res.send(json)
    })
}

exports.update = function (req, res) {
  Clock.findOne(req.body.id)
    .then((clockFromDB) => {
      const clock = new Clock(clockFromDB[0])
      clock.update(req.body)
        .then(result => {
          const json = JSON.stringify(req.body)
          res.send(json)
        })
        .catch(err => {
          res.status(400).send('Error update clock')
        })
    })
}

exports.get = function (req, res) {
  Clock.findOne(req.body.id)
    .then((clock) => {
      const json = JSON.stringify(clock[0])
      res.send(json)
    })
}

exports.add = function (req, res) {
  const clock = new Clock(req.body)
  clock.add()
    .then(result => {
      Clock.findOne(result.insertId)
        .then(clocks => {
          const json = JSON.stringify(clocks[0])
          res.status(201).send(json)
        })
    })
    .catch(err => {
      res.status(400).send('Error add clock')
    })
}

exports.delete = function (req, res) {
  Clock.delete(req.body.id)
    .then(result => {
      const json = JSON.stringify(req.body)
      res.send(json)
    })
    .catch(err => {
      res.status(400).send('Error delete clock')
    })
}
