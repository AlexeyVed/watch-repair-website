export const validateEmail = (input) => {
  if (input === void 0) {

  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(input)) {
    return 'Invalid email address'
  }
}

export const confirmEmail = (input, allInputs) => (
  input === allInputs.email ? '' : 'Email does not match'
)

export const validatePassword = (input) => (
  (input === void 0 || input.length > 4) ? void 0 : 'Password must be over 5 symbols'
)

export const confirmPassword = (input, allInputs) => (
  input === allInputs.password ? void 0 : 'Password does not match'
)
export const required = value => value ? undefined : 'Required'

export const validateOnlyLetter = (input) => {
  if (input === void 0) {

  } else if (!/^[A-Z]+$/i.test(input)) {
    return 'This input must contain only letter.'
  }
}
