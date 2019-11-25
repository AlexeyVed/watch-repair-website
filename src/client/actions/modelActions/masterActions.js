import {
  LOAD_MASTERS_STARTED,
  LOAD_MASTERS_SUCCESS,
  LOAD_MASTERS_FAILURE,
  ADD_MASTER_STARTED,
  ADD_MASTER_FAILURE,
  ADD_MASTER_SUCCESS,
  DELETE_MASTER_STARTED,
  DELETE_MASTER_FAILURE,
  DELETE_MASTER_SUCCESS,
  EDIT_MASTER_STARTED,
  EDIT_MASTER_FAILURE,
  EDIT_MASTER_SUCCESS,
  REDIRECT_FROM_REFACTOR,
  GET_MASTER_STARTED,
  GET_MASTER_SUCCESS,
  GET_MASTER_FAILURE
} from '../types.js'

import axios from 'axios'

export const loadMasters = () => {
  return (dispatch) => {
    dispatch({ type: LOAD_MASTERS_STARTED })
    return axios
      .get(`/api/masters/`)
      .then(res => {
        dispatch(loadMastersSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadMastersFailure(err.response.data))
      })
  }
}

export const getMaster = id => {
  return (dispatch) => {
    dispatch({ type: GET_MASTER_STARTED })
    return axios
      .get(`/api/masters/${id}`)
      .then(res => {
        dispatch({ type: GET_MASTER_SUCCESS, payload: res.data })
        return res.data
      })
      .catch(err => {
        dispatch({ type: GET_MASTER_FAILURE, payload: err.response.data })
      })
  }
}

export const addMastersToDB = (values) => {
  return (dispatch) => {
    dispatch({ type: ADD_MASTER_STARTED })
    return axios
      .post(`/api/masters/`, values)
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
    dispatch({ type: EDIT_MASTER_STARTED })
    return axios
      .put(`/api/masters/${values.id}`, values)
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
    dispatch({ type: DELETE_MASTER_STARTED })
    return axios
      .delete(`/api/masters/${id}`)
      .then(res => {
        dispatch(deleteMastersSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteMastersFailure(err.response.data))
      })
  }
}

export const loadMastersFailure = err => ({
  type: LOAD_MASTERS_FAILURE,
  payload: err
})

export const loadMastersSuccess = data => ({
  type: LOAD_MASTERS_SUCCESS,
  payload: data
})

export const addMastersFailure = (err) => ({
  type: ADD_MASTER_FAILURE,
  payload: err
})

export const deleteMastersFailure = (err) => ({
  type: DELETE_MASTER_FAILURE,
  payload: err
})

export const editMastersFailure = (err) => ({
  type: EDIT_MASTER_FAILURE,
  payload: err
})

export const addMastersSuccess = data => ({
  type: ADD_MASTER_SUCCESS,
  message: 'Master was successfully added.',
  payload: data
})

export const deleteMastersSuccess = data => ({
  type: DELETE_MASTER_SUCCESS,
  message: 'Master was successfully removed.',
  payload: data
})

export const editMastersSuccess = data => ({
  type: EDIT_MASTER_SUCCESS,
  message: 'Master was successfully edited.',
  payload: data
})
