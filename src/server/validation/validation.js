exports.loginValidation = (mail, pass) => {
  if (!mail || !pass) {
    return true
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mail)) {
    return true
  } else if (pass.length <= 4) {
    return true
  }
  return false
}

exports.passwordConfirm = (pass1, pass2) => {
  if (pass1 === pass2) {
    return true
  } else {
    return false
  }
}
