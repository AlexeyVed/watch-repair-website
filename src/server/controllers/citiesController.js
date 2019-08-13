const error = require('../services/modules.js').makeError
const City = require('../models/cities.js')

exports.list = function (req, res, next) {
  try {
    City.findAll()
      .then(cities => {
        const json = JSON.stringify(cities)
        res.send(json)
      })
  } catch (e) {
    next(error(400, 'Error get list of cities'))
  }
}

exports.get = function (req, res, next) {
  try {
    if (!req.body.id) {
      return next(error(400, 'Your must fill all fields'))
    }
    City.findByPk(req.body.id)
      .then((city) => {
        const json = JSON.stringify(city)
        res.send(json)
      })
  } catch (e) {
    next(error(400, 'Error get city.'))
  }
}

exports.add = function (req, res, next) {
  try {
    if (!req.body.city) {
      return next(error(400, 'Your must fill all fields'))
    }
    City.create({
      city: req.body.city
    })
      .then(result => {
        const json = JSON.stringify(result)
        res.status(201).send(json)
      })
  } catch (e) {
    next(error(400, 'Error add city'))
  }
}

exports.delete = function (req, res, next) {
  try {
    if (!req.body.id) {
      return next(error(400, 'Your must fill all fields'))
    }
    City.destroy({
      where: {
        id: req.body.id
      }
    })
      .then(result => {
        const json = JSON.stringify(req.body)
        res.send(json)
      })
  } catch (e) {
    next(error(400, 'Error delete city'))
  }
}

exports.update = function (req, res, next) {
  try {
    if (!req.body.id || !req.body.city) {
      return next(error(400, 'Your must fill all fields'))
    }
    City.update({
      city: req.body.city
    }, {
      where: {
        id: req.body.id
      }
    }).then((result) => {
      City.findByPk(req.body.id)
        .then(city => {
          const json = JSON.stringify(city)
          res.send(json)
        })
    })
  } catch (e) {
    next(error(400, 'Error update city'))
  }
}
