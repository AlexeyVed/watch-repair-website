const Worker = require('../models/workers.js')

exports.getWorkers = function (req, res) {
  Worker.getAll()
    .then(result => {
      res.send(result)
    })
}

exports.updateWorker = function (req, res) {
  const worker = new Worker(req.body.name, req.body.city, req.body.rating, req.body.id)
  worker.updateWorker()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error update worker')
    })
}

exports.addWorker = function (req, res) {
  const worker = new Worker(req.body.name, req.body.city, req.body.rating)
  worker.addWorker()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error add worker')
    })
}

exports.deleteWorker = function (req, res) {
  Worker.deleteWorker(req.body.id)
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      res.status(400).send('Error delete worker')
    })
}
