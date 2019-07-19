export const validateEmail = (input) => {
  if (input === void 0) {

  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
    return 'Invalid email address'
  }
}

export const confirmEmail = (input, allInputs) => (
  input === allInputs.emailReg ? '' : 'Email does not match'
)

export const validatePassword = (input) => (
  (input === void 0 || input.length > 4) ? void 0 : 'Password must be over 5 symbols'
)

export const confirmPassword = (input, allInputs) => (
  input === allInputs.passwordReg ? void 0 : 'Password does not match'
)
