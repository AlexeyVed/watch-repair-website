import {
  SING_IN_SUCCESS,
  SING_IN_FAILURE,
  SING_IN_STARTED,
  LOG_OUT,
  LOGIN_ERROR_NULL,
  CHECK_ACCESS_ADMIN_STARTED,
  CHECK_ACCESS_ADMIN_SUCCESS,
  CHECK_ACCESS_ADMIN_FAILURE
} from './types.js'

import axios from 'axios'

export const loginToApp = values => {
  return (dispatch) => {
    dispatch({ type: SING_IN_STARTED })
    return axios
      .post(`/api/users/login`, values)
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

export const checkAccesAdmin = email => {
  return (dispatch) => {
    dispatch({ type: CHECK_ACCESS_ADMIN_STARTED })
    return axios
      .post(`/api/users/authAdmin`, { email })
      .then(res => {
        dispatch({ type: CHECK_ACCESS_ADMIN_SUCCESS })
      })
      .catch(err => {
        dispatch({ type: CHECK_ACCESS_ADMIN_FAILURE, payload: err.response.data })
      })
  }
}

export const logOutApp = () => {
  return (dispatch) => {
    return axios
      .get(`/api/users/logout`)
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

export const missLoginError = () => ({ type: LOGIN_ERROR_NULL })

export const singInSuccess = user => ({
  type: SING_IN_SUCCESS,
  payload: user
})

export const singInFailure = error => ({
  type: SING_IN_FAILURE,
  payload: error
})
