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
  EDIT_CLOCKS_SUCCESS,
  REDIRECT_FROM_REFACTOR
} from '../types.js'

import axios from 'axios'

export const loadClocks = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['authorization'] = token
    }
    dispatch({ type: LOAD_CLOCKS_STARTED })
    return axios
      .get(`/api/clocks/`)
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
    dispatch({ type: ADD_CLOCKS_STARTED })
    axios
      .post(`/api/clocks/`, values)
      .then(res => {
        dispatch(addClocksSuccess(res.data))
      })
      .then(() => {
        dispatch({ type: REDIRECT_FROM_REFACTOR })
      })
      .catch(err => {
        dispatch(addClocksFailure(err.response.data))
      })
  }
}

export const editClockIntoDB = (values) => {
  return (dispatch) => {
    dispatch({ type: EDIT_CLOCKS_STARTED })
    axios
      .put(`/api/clocks/id?id=${values.id}`, values)
      .then(res => {
        dispatch(editClocksSuccess(res.data))
      })
      .then(() => {
        dispatch({ type: REDIRECT_FROM_REFACTOR })
      })
      .catch(err => {
        dispatch(editClocksFailure(err.response.data))
      })
  }
}

export const deleteClockFromDB = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_CLOCKS_STARTED })
    axios
      .delete(`/api/clocks/id?id=${id}`)
      .then(res => {
        dispatch(deleteClocksSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteClocksFailure(err.response.data))
      })
  }
}

const loadClocksFailure = err => ({
  type: LOAD_CLOCKS_FAILURE,
  payload: err
})

const loadClocksSuccess = data => ({
  type: LOAD_CLOCKS_SUCCESS,
  payload: data
})

const addClocksFailure = (err) => ({
  type: ADD_CLOCKS_FAILURE,
  payload: err
})

const deleteClocksFailure = (err) => ({
  type: DELETE_CLOCKS_FAILURE,
  payload: err
})

const editClocksFailure = (err) => ({
  type: EDIT_CLOCKS_FAILURE,
  payload: err
})

const addClocksSuccess = data => ({
  type: ADD_CLOCKS_SUCCESS,
  message: 'Clock was successfully added.',
  payload: data
})

const deleteClocksSuccess = data => ({
  type: DELETE_CLOCKS_SUCCESS,
  message: 'Clock was successfully removed.',
  payload: data
})

const editClocksSuccess = data => ({
  type: EDIT_CLOCKS_SUCCESS,
  message: 'Clock was successfully edited.',
  payload: data
})
