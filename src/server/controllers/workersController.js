const Worker = require('../models/workers.js')

exports.getWorkers = function (req, res) {
  Worker.getAll()
    .then(result => {
      res.send(result)
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
