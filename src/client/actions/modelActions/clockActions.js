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
  REDIRECT_FROM_REFACTOR,
  GET_CLOCK_FOR_EDIT_STARTED,
  GET_CLOCK_FOR_EDIT_SUCCESS,
  GET_CLOCK_FOR_EDIT_FAILURE
} from '../types.js'

import axios from 'axios'

export const loadClocks = () => {
  return (dispatch) => {
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

export const getClock = id => {
  return (dispatch) => {
    dispatch({ type: GET_CLOCK_FOR_EDIT_STARTED })
    return axios
      .get(`/api/clocks/${id}`)
      .then(res => {
        dispatch({ type: GET_CLOCK_FOR_EDIT_SUCCESS })
        return res.data
      })
      .catch(err => {
        dispatch({ type: GET_CLOCK_FOR_EDIT_FAILURE, payload: err.response.data })
      })
  }
}

export const addClockToDB = (values) => {
  return (dispatch) => {
    dispatch({ type: ADD_CLOCKS_STARTED })
    return axios
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
    return axios
      .put(`/api/clocks/${values.id}`, values)
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
    return axios
      .delete(`/api/clocks/${id}`)
      .then(res => {
        dispatch(deleteClocksSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteClocksFailure(err.response.data))
      })
  }
}

export const loadClocksFailure = err => ({
  type: LOAD_CLOCKS_FAILURE,
  payload: err
})

export const loadClocksSuccess = data => ({
  type: LOAD_CLOCKS_SUCCESS,
  payload: data
})

export const addClocksFailure = (err) => ({
  type: ADD_CLOCKS_FAILURE,
  payload: err
})

export const deleteClocksFailure = (err) => ({
  type: DELETE_CLOCKS_FAILURE,
  payload: err
})

export const editClocksFailure = (err) => ({
  type: EDIT_CLOCKS_FAILURE,
  payload: err
})

export const addClocksSuccess = data => ({
  type: ADD_CLOCKS_SUCCESS,
  message: 'Clock was successfully added.',
  payload: data
})

export const deleteClocksSuccess = data => ({
  type: DELETE_CLOCKS_SUCCESS,
  message: 'Clock was successfully removed.',
  payload: data
})

export const editClocksSuccess = data => ({
  type: EDIT_CLOCKS_SUCCESS,
  message: 'Clock was successfully edited.',
  payload: data
})
