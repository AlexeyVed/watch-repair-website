const Worker = require('../models/workers.js')

exports.list = function (req, res) {
  Worker.list()
    .then(result => {
      const json = JSON.stringify(result)
      res.send(json)
    })
}

exports.update = function (req, res) {
  Worker.findOne(req.body.idworker)
    .then(workerFromDB => {
      const worker = new Worker(workerFromDB[0])
      worker.update(req.body)
        .then(result => {
          const json = JSON.stringify(req.body)
          res.send(json)
        })
        .catch(err => {
          res.status(400).send('Error update worker')
        })
    })
}

exports.get = function (req, res) {
  Worker.findOne(req.body.id)
    .then((worker) => {
      const json = JSON.stringify(worker[0])
      res.send(json)
    })
}

exports.add = function (req, res) {
  const worker = new Worker(req.body)
  worker.add()
    .then(result => {
      Worker.findOne(result.insertId)
        .then((worker) => {
          const json = JSON.stringify(worker[0])
          res.status(201).send(json)
        })
    })
    .catch(err => {
      res.status(400).send('Error add worker')
    })
}

exports.delete = function (req, res) {
  Worker.delete(req.body.id)
    .then(result => {
      const json = JSON.stringify(req.body)
      res.send(json)
    })
    .catch(err => {
      res.status(400).send('Error delete worker')
    })
}
