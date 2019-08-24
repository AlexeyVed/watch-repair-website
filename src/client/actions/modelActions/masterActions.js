import {
  LOAD_MASTERS_STARTED,
  LOAD_MASTERS_SUCCESS,
  LOAD_MASTERS_FAILURE,
  ADD_MASTERS_STARTED,
  ADD_MASTERS_FAILURE,
  ADD_MASTERS_SUCCESS,
  DELETE_MASTERS_STARTED,
  DELETE_MASTERS_FAILURE,
  DELETE_MASTERS_SUCCESS,
  EDIT_MASTERS_STARTED,
  EDIT_MASTERS_FAILURE,
  EDIT_MASTERS_SUCCESS,
  REDIRECT_FROM_REFACTOR
} from '../types.js'

import axios from 'axios'

export const loadMasters = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['authorization'] = token
    dispatch({ type: LOAD_MASTERS_STARTED })
    return axios
      .get(`http://localhost:3000/api/masters/list`)
      .then(res => {
        dispatch(loadMastersSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadMastersFailure(err.response.data))
      })
  }
}

export const addMastersToDB = (values) => {
  return (dispatch) => {
    dispatch({ type: ADD_MASTERS_STARTED })
    axios
      .post(`http://localhost:3000/api/masters/add`, values)
      .then(res => {
        dispatch(addMastersSuccess(res.data))
      })
      .then(() => {
        dispatch({ type: REDIRECT_FROM_REFACTOR })
      })
      .catch(err => {
        dispatch(addMastersFailure(err.response.data))
      })
  }
}

export const editMastersIntoDB = (values) => {
  return (dispatch) => {
    dispatch({ type: EDIT_MASTERS_STARTED })
    axios
      .post(`http://localhost:3000/api/masters/update`, values)
      .then(res => {
        dispatch(editMastersSuccess(res.data))
      })
      .then(() => {
        dispatch({ type: REDIRECT_FROM_REFACTOR })
      })
      .catch(err => {
        dispatch(editMastersFailure(err.response.data))
      })
  }
}

export const deleteMastersFromDB = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_MASTERS_STARTED })
    axios
      .post(`http://localhost:3000/api/masters/delete`, { id })
      .then(res => {
        dispatch(deleteMastersSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteMastersFailure(err.response.data))
      })
  }
}

const loadMastersFailure = err => ({
  type: LOAD_MASTERS_FAILURE,
  payload: err
})

const loadMastersSuccess = data => ({
  type: LOAD_MASTERS_SUCCESS,
  payload: data
})

const addMastersFailure = (err) => ({
  type: ADD_MASTERS_FAILURE,
  payload: err
})

const deleteMastersFailure = (err) => ({
  type: DELETE_MASTERS_FAILURE,
  payload: err
})

const editMastersFailure = (err) => ({
  type: EDIT_MASTERS_FAILURE,
  payload: err
})

const addMastersSuccess = data => ({
  type: ADD_MASTERS_SUCCESS,
  message: 'Master was successfully added.',
  payload: data
})

const deleteMastersSuccess = data => ({
  type: DELETE_MASTERS_SUCCESS,
  message: 'Master was successfully removed.',
  payload: data
})

const editMastersSuccess = data => ({
  type: EDIT_MASTERS_SUCCESS,
  message: 'Master was successfully edited.',
  payload: data
})
