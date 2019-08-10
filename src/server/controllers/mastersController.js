const Master = require('../models/masters.js')
const City = require('../models/cities.js')

exports.list = function (req, res) {
  Master.findAll({
    include: [{
      model: City
    }]
  })
    .then(masters => {
      const json = JSON.stringify(masters)
      res.send(json)
    })
}

exports.get = function (req, res) {
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
}

exports.add = function (req, res) {
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
    .catch(err => {

    })
}

exports.delete = function (req, res) {
  Master.destroy({
    where: {
      id: req.body.id
    }
  })
    .then(result => {
      const json = JSON.stringify(req.body)
      res.send(json)
    })
}

exports.update = function (req, res) {
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
}
