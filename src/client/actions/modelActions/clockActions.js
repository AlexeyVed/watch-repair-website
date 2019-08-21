import {
  LOAD_CLOCKS_STARTED,
  LOAD_CLOCKS_SUCCESS,
  LOAD_CLOCKS_FAILURE,
  ADD_CLOCKS_STARTED,
  ADD_CLOCKS_FAILURE,
  ADD_CLOCKS_SUCCESS,
  DELETE_CLOCKS_STARTED,
  DELETE_CLOCKS_FAILURE,
  DELETE_CLOCKS_SUCCESS,
  EDIT_CLOCKS_STARTED,
  EDIT_CLOCKS_FAILURE,
  EDIT_CLOCKS_SUCCESS
} from './types.js'

import axios from 'axios'

export const loadClocks = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['authorization'] = token
    }
    dispatch(loadClocksStarted())
    return axios
      .get(`http://localhost:3000/api/clocks/list`)
      .then(res => {
        dispatch(loadClocksSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadClocksFailure(err.response.data))
      })
  }
}

export const addClockToDB = (values) => {
  return (dispatch) => {
    dispatch(addClocksStarted())
    axios
      .post(`http://localhost:3000/api/clocks/add`, values)
      .then(res => {
        dispatch(addClocksSuccess(res.data))
      })
      .catch(err => {
        dispatch(addClocksFailure(err.response.data))
      })
  }
}

export const editClockIntoDB = (values) => {
  return (dispatch) => {
    dispatch(editClocksStarted())
    axios
      .post(`http://localhost:3000/api/clocks/update`, values)
      .then(res => {
        dispatch(editClocksSuccess(res.data))
      })
      .catch(err => {
        dispatch(editClocksFailure(err.response.data))
      })
  }
}

export const deleteClockFromDB = (id) => {
  return (dispatch) => {
    dispatch(deleteClocksStarted())
    axios
      .post(`http://localhost:3000/api/clocks/delete`, { id })
      .then(res => {
        dispatch(deleteClocksSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteClocksFailure(err.response.data))
      })
  }
}

const loadClocksStarted = () => ({
  type: LOAD_CLOCKS_STARTED
})

const loadClocksFailure = err => ({
  type: LOAD_CLOCKS_FAILURE,
  payload: err
})

const loadClocksSuccess = data => ({
  type: LOAD_CLOCKS_SUCCESS,
  payload: data
})

const addClocksStarted = () => ({
  type: ADD_CLOCKS_STARTED
})

const addClocksFailure = (err) => ({
  type: ADD_CLOCKS_FAILURE,
  payload: err
})

const deleteClocksStarted = () => ({
  type: DELETE_CLOCKS_STARTED
})

const deleteClocksFailure = (err) => ({
  type: DELETE_CLOCKS_FAILURE,
  payload: err
})

const editClocksStarted = () => ({
  type: EDIT_CLOCKS_STARTED
})

const editClocksFailure = (err) => ({
  type: EDIT_CLOCKS_FAILURE,
  payload: err
})

const addClocksSuccess = data => ({
  type: ADD_CLOCKS_SUCCESS,
  payload: data
})

const deleteClocksSuccess = data => ({
  type: DELETE_CLOCKS_SUCCESS,
  payload: data
})

const editClocksSuccess = data => ({
  type: EDIT_CLOCKS_SUCCESS,
  payload: data
})
