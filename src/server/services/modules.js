exports.makeError = (code, message, payload) => {
  return {
    code: code,
    message: message,
    payload: payload || null
  }
}
