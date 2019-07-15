const Clock = require('../models/clocks.js')

exports.getClocks = function (req, res) {
  Clock.getAll()
    .then(result => {
      res.send(result)
    })
}

exports.addClock = function (req, res) {
  const clock = new Clock(req.body.typeClock, req.body.timeRepair)
  clock.addClock()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error add clock')
    })
}

exports.deleteClock = function (req, res) {
  res.send(req)
  /* Clock.deleteClock()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error add clock')
    }) */
}
