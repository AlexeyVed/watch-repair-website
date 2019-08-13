module.exports = function (err, req, res, next) {
  res.status(err.code).json(err.message)
}
