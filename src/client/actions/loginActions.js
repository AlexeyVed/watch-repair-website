import {
  SING_IN_SUCCESS,
  SING_IN_FAILURE,
  SING_IN_STARTED,
  LOG_OUT,
  REDIRECT_LOGIN_SUCCESS
} from './types'

import axios from 'axios'

export const loginToApp = (email, password) => {
  return (dispatch) => {
    dispatch(singInStarted())

    axios
      .post(`http://localhost:4000/login`, { email, password })
      .then(res => {
        console.log(res.data)
        dispatch(singInSuccess(res.data))
        dispatch(redirectLoginSuccess())
      })
      .catch(err => {
        dispatch(singInFailure(err.response.data))
      })
  }
}

export const logOutApp = (email, password) => {
  return (dispatch) => {
    dispatch(logOut())
  }
}

const singInSuccess = user => ({
  type: SING_IN_SUCCESS,
  payload: user
})

const redirectLoginSuccess = () => ({
  type: REDIRECT_LOGIN_SUCCESS
})

const singInStarted = () => ({
  type: SING_IN_STARTED
})

const singInFailure = error => ({
  type: SING_IN_FAILURE,
  payload: error
})

const logOut = () => ({
  type: LOG_OUT,
  payload: null
})
