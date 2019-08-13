const error = require('../services/modules.js').makeError
const Master = require('../models/masters.js')
const City = require('../models/cities.js')

exports.list = function (req, res, next) {
  try {
    Master.findAll({
      include: [{
        model: City
      }]
    })
      .then(masters => {
        const json = JSON.stringify(masters)
        res.send(json)
      })
  } catch (e) {
    next(error(500, 'Error get list of masters'))
  }
}

exports.get = function (req, res, next) {
  try {
    if (!req.body.id) {
      return next(error(400, 'Your must fill all fields'))
    }
    Master.findOne({
      where: {
        id: req.body.id
      },
      include: [{
        model: City
      }]
    })
      .then((worker) => {
        const json = JSON.stringify(worker)
        res.send(json)
      })
  } catch (e) {
    next(error(500, 'Error get master'))
  }
}

exports.add = function (req, res, next) {
  try {
    if (!req.body.name || !req.body.rating || !req.body.cityId) {
      return next(error(400, 'Your must fill all fields'))
    }
    Master.create({
      name: req.body.name,
      rating: req.body.rating,
      cityId: req.body.cityId
    })
      .then(result => {
        Master.findOne({
          where: {
            id: result.id
          },
          include: [{
            model: City
          }]
        })
          .then(master => {
            const json = JSON.stringify(master)
            res.status(201).send(json)
          })
      })
  } catch (e) {
    next(error(500, 'Error add master'))
  }
}

exports.delete = function (req, res, next) {
  try {
    if (!req.body.id) {
      return next(error(400, 'Your must fill all fields'))
    }
    Master.destroy({
      where: {
        id: req.body.id
      }
    })
      .then(result => {
        const json = JSON.stringify(req.body)
        res.send(json)
      })
  } catch (e) {
    next(error(500, 'Error delete master'))
  }
}

exports.update = function (req, res, next) {
  try {
    if (!req.body.name || !req.body.rating || !req.body.cityId || !req.body.id) {
      return next(error(400, 'Your must fill all fields'))
    }
    Master.update({
      name: req.body.name,
      rating: req.body.rating,
      cityId: req.body.cityId
    }, {
      where: {
        id: req.body.id
      }
    })
      .then(result => {
        Master.findOne({
          where: {
            id: req.body.id
          },
          include: [{
            model: City
          }]
        })
          .then(master => {
            const json = JSON.stringify(master)
            res.status(201).send(json)
          })
      })
  } catch (e) {
    next(error(500, 'Error update master'))
  }
}
