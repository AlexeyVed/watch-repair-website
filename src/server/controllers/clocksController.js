const Clock = require('../models/clocks.js')

exports.getClocks = function (req, res) {
  Clock.getAll()
    .then(result => {
      res.send(result)
    })
}
