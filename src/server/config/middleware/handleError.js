module.exports = function (err, req, res, next) {
  console.log(err)
  if (err.code) {
    if (err.payload) {
      let result = 'Incorrect fields: '
      err.payload.forEach((item, index) => {
        if (!result.includes(`${item.param}`)) {
          if (index === err.payload.length - 1) {
            result += `${item.param}.`
          } else {
            result += `${item.param}, `
          }
        }
      })
      return res.status(err.code).json(result)
    }
    return res.status(err.code).json(err.message)
  }
  res.send(err)
}
