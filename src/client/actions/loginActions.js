import {
  SING_IN_SUCCESS,
  SING_IN_FAILURE,
  SING_IN_STARTED,
  LOG_OUT,
  REDIRECT_LOGOUT,
  SING_IN_FROM_LOCAL_STORAGE
} from './types'

import axios from 'axios'

export const loginToApp = (email, password) => {
  return (dispatch) => {
    dispatch(singInStarted())

    axios
      .post(`http://localhost:4000/users/login`, { email, password })
      .then(res => {
        localStorage.setItem('user', res.data)
        dispatch(singInSuccess(res.data))
      })
      .catch(err => {
        dispatch(singInFailure(err.response.data))
      })
  }
}

export const logOutApp = () => {
  return (dispatch) => {
    dispatch(logOut())
  }
}

export const singInFromLS = (user) => {
  return (dispatch) => {
    dispatch(singInLS(user))
  }
}

const singInSuccess = user => ({
  type: SING_IN_SUCCESS,
  payload: user
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

const singInLS = (user) => ({
  type: SING_IN_FROM_LOCAL_STORAGE,
  payload: user
})
