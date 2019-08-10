const Clock = require('../models/clocks.js')

exports.list = function (req, res) {
  Clock.findAll()
    .then(clocks => {
      const json = JSON.stringify(clocks)
      res.send(json)
    })
}

exports.get = function (req, res) {
  Clock.findByPk(req.body.id)
    .then((clock) => {
      const json = JSON.stringify(clock)
      res.send(json)
    })
}

exports.add = function (req, res) {
  Clock.create({
    typeClock: req.body.typeClock,
    timeRepair: req.body.timeRepair
  })
    .then(result => {
      const json = JSON.stringify(result)
      res.status(201).send(json)
    })
    .catch(err => {

    })
}

exports.delete = function (req, res) {
  Clock.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(result => {
      res.send('OK')
    })
}

exports.update = function (req, res) {
  Clock.update({
    typeClock: req.body.typeClock,
    timeRepair: req.body.timeRepair
  }, {
    where: {
      id: req.body.id
    }
  }).then((result) => {
    res.send(result)
  })
}
