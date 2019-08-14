const error = require('../services/modules.js').makeError
const Clock = require('../models/clocks.js')

exports.list = function (req, res, next) {
  try {
    Clock.findAll()
      .then(clocks => {
        const json = JSON.stringify(clocks)
        try {
          const obj = JSON.parse(json)
          obj.sort((a, b) => {
            if (a.timeRepair > b.timeRepair) {
              return 1
            }
            if (a.timeRepair < b.timeRepair) {
              return -1
            }
          })
          res.json(obj)
        } catch (e) {
          res.send(json)
        }
      })
  } catch (e) {
    next(error(400, 'Error get list of clocks'))
  }
}

exports.get = function (req, res, next) {
  try {
    if (!req.body.id) {
      return next(error(400, 'Your must fill all fields'))
    }
    Clock.findByPk(req.body.id)
      .then((clock) => {
        const json = JSON.stringify(clock)
        res.send(json)
      })
  } catch (e) {
    next(error(400, 'Error get clock'))
  }
}

exports.add = function (req, res, next) {
  try {
    if (!req.body.typeClock || !req.body.timeRepair) {
      return next(error(400, 'Your must fill all fields'))
    }
    Clock.create({
      typeClock: req.body.typeClock,
      timeRepair: req.body.timeRepair
    })
      .then(result => {
        const json = JSON.stringify(result)
        res.status(201).send(json)
      })
  } catch (e) {
    next(error(400, 'Error add clock'))
  }
}

exports.delete = function (req, res, next) {
  if (!req.body.id) {
    return next(error(400, 'Your must fill all fields'))
  }
  try {
    Clock.destroy({
      where: {
        id: req.body.id
      }
    })
      .then(result => {
        const json = JSON.stringify(req.body)
        res.send(json)
      })
  } catch (e) {
    next(error(400, 'Error delete clock'))
  }
}

exports.update = function (req, res, next) {
  try {
    if (!req.body.id || !req.body.timeRepair || !req.body.typeClock) {
      return next(error(400, 'Your must fill all fields'))
    }
    Clock.update({
      typeClock: req.body.typeClock,
      timeRepair: req.body.timeRepair
    }, {
      where: {
        id: req.body.id
      }
    }).then((result) => {
      Clock.findByPk(req.body.id)
        .then(clock => {
          const json = JSON.stringify(clock)
          res.send(json)
        })
    })
  } catch (e) {
    next(error(400, 'Error update clock'))
  }
}
