const Clock = require('../models/clocks.js')

exports.getClocks = function (req, res) {
  Clock.getAll()
    .then(result => {
      res.send(result)
    })
}

exports.updateClock = function (req, res) {
  const clock = new Clock(req.body)
  clock.updateClock()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error update clock')
    })
}

exports.addClock = function (req, res) {
  const clock = new Clock(req.body)
  clock.addClock()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error add clock')
    })
}

exports.deleteClock = function (req, res) {
  Clock.deleteClock(req.body.id)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error delete clock')
    })
}
