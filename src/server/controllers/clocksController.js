const Clock = require('../models/clocks.js')

exports.list = function (req, res) {
  Clock.list()
    .then(result => {
      const json = JSON.stringify(result)
      res.send(json)
    })
}

exports.update = function (req, res) {
  const clock = new Clock(req.body)
  clock.update()
    .then(result => {
      const json = JSON.stringify(result)
      res.send(json)
    })
    .catch(err => {
      res.status(400).send('Error update clock')
    })
}

exports.add = function (req, res) {
  const clock = new Clock(req.body)
  clock.add()
    .then(result => {
      const json = JSON.stringify(result)
      res.send(json)
    })
    .catch(err => {
      res.status(400).send('Error add clock')
    })
}

exports.delete = function (req, res) {
  Clock.delete(req.body.id)
    .then(result => {
      const json = JSON.stringify(result)
      res.send(json)
    })
    .catch(err => {
      res.status(400).send('Error delete clock')
    })
}
