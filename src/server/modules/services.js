exports.makeError = (code, message, payload) => {
  return {
    code: code,
    message: message,
    payload: payload || null
  }
}

exports.getToday = () => {
  const now = new Date()
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate(),
    hour: now.getHours() + 1
  }
}

exports.filterBussyMaster = (result, time, timeRepair) => {
  const string = JSON.stringify(result)
  const obj = JSON.parse(string)
  const isCreated = obj.filter(order => {
    return (order.time < time)
      ? ((order.time + order.clock.timeRepair) >= time)
      : ((time + timeRepair) >= order.time)
  })
  return isCreated
}
