import {
  SING_IN_SUCCESS,
  SING_IN_FAILURE,
  SING_IN_STARTED,
  LOG_OUT,
  SING_IN_FROM_LOCAL_STORAGE,
  LOGIN_ERROR_NULL,
  /* REGISTRATION_STARTED,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE, */
} from './types.js'

import axios from 'axios'

export const loginToApp = (values) => {
  return (dispatch) => {
    dispatch({ type: SING_IN_STARTED })

    axios
      .post(`http://localhost:3000/api/users/login`, values)
      .then(res => {
        localStorage.setItem('user', res.data.user.email)
        localStorage.setItem('token', res.data.token)
        dispatch(singInSuccess(res.data.user.email))
      })
      .catch(err => {
        dispatch(singInFailure(err.response.data))
      })
  }
}


export const logOutApp = () => {
  return (dispatch) => {
    axios
      .post(`http://localhost:3000/api/users/logout`)
      .then(res => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        dispatch({ type: LOG_OUT })
      })
      .catch(err => {
        dispatch(singInFailure(err.response.data))
      })
  }
}

export const missLoginError = () => {
  return (dispatch) => {
    dispatch({ type: LOGIN_ERROR_NULL })
  }
}

const singInSuccess = user => ({
  type: SING_IN_SUCCESS,
  payload: user
})

const singInFailure = error => ({
  type: SING_IN_FAILURE,
  payload: error
})

/* export const registrationToApp = (values) => {
  return (dispatch) => {
    dispatch(registrationStarted())

    axios
      .post(`http://localhost:3000/api/users/registration`, values)
      .then(res => {
        localStorage.setItem('user', res.data)
        dispatch(registrationSuccess(res.data))
      })
      .catch(err => {
        dispatch(registrationFailure(err.response.data))
      })
  }
}

 const registrationStarted = () => ({
  type: REGISTRATION_STARTED
})

const registrationSuccess = user => ({
  type: REGISTRATION_SUCCESS,
  payload: user
})

const registrationFailure = error => ({
  type: REGISTRATION_FAILURE,
  payload: error
}) */
