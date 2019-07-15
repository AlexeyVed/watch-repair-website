import {
  LOAD_DATA_USER_STARTED,
  LOAD_DATA_USER_SUCCESS,
  LOAD_DATA_USER_FAILURE
} from './types.js'

import axios from 'axios'

export const loadDataUser = () => {
  return (dispatch) => {
    dispatch(loadDataStarted())
    axios
      .get(`http://localhost:4000/data/getData`)
      .then(res => {
        dispatch(loadDataSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadDataFailure(err.response.data))
      })
  }
}

const loadDataStarted = () => ({
  type: LOAD_DATA_USER_STARTED
})

const loadDataSuccess = data => ({
  type: LOAD_DATA_USER_SUCCESS,
  payload: data
})

const loadDataFailure = err => ({
  type: LOAD_DATA_USER_FAILURE,
  payload: err
})
