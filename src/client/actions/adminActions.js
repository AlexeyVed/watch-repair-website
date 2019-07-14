import {
  CHANGE_ADMIN_VIEW,
  LOAD_DATA_FAILURE,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_STARTED
} from './types.js'

import axios from 'axios'

export const changeAdminView = view => {
  return {
    type: CHANGE_ADMIN_VIEW,
    payload: view
  }
}

export const loadData = () => {
  return (dispatch) => {
    dispatch(loadDataStarted())
    axios
      .get(`http://localhost:4000/data/getAll`)
      .then(res => {
        console.log('load data success')
        dispatch(loadDataSuccess(res.data))
      })
      .catch(err => {
        console.log('load data failed')
        dispatch(loadDataFailure(err.response.data))
      })
  }
}

const loadDataStarted = () => ({
  type: LOAD_DATA_STARTED
})

const loadDataFailure = data => ({
  type: LOAD_DATA_FAILURE,
  payload: data
})

const loadDataSuccess = err => ({
  type: LOAD_DATA_SUCCESS,
  payload: err
})
