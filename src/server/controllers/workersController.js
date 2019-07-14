const Worker = require('../models/workers.js')

exports.getWorkers = function (req, res) {
  Worker.getAll()
    .then(result => {
      res.send(result)
    })
}
