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
