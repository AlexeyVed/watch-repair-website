import {
  LOAD_CITIES_STARTED,
  LOAD_CITIES_SUCCESS,
  LOAD_CITIES_FAILURE,
  ADD_CITIES_STARTED,
  ADD_CITIES_FAILURE,
  ADD_CITIES_SUCCESS,
  DELETE_CITIES_STARTED,
  DELETE_CITIES_FAILURE,
  DELETE_CITIES_SUCCESS,
  EDIT_CITIES_STARTED,
  EDIT_CITIES_FAILURE,
  EDIT_CITIES_SUCCESS,
  REDIRECT_FROM_REFACTOR
} from '../types.js'

import axios from 'axios'

export const loadCities = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['authorization'] = token
    }
    dispatch({ type: LOAD_CITIES_STARTED })
    return axios
      .get(`http://localhost:3000/api/cities/`)
      .then(res => {
        dispatch(loadCitiesSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadCitiesFailure(err.response.data))
      })
  }
}

export const addCityToDB = (values) => {
  return (dispatch) => {
    dispatch({ type: ADD_CITIES_STARTED })
    axios
      .post(`http://localhost:3000/api/cities/`, values)
      .then(res => {
        dispatch(addCitiesSuccess(res.data))
      })
      .then(() => {
        dispatch({ type: REDIRECT_FROM_REFACTOR })
      })
      .catch(err => {
        dispatch(addCitiesFailure(err.response.data))
      })
  }
}

export const editCityIntoDB = (values) => {
  return (dispatch) => {
    dispatch({ type: EDIT_CITIES_STARTED })
    axios
      .put(`http://localhost:3000/api/cities/id?id=${values.id}`, values)
      .then(res => {
        dispatch(editCitiesSuccess(res.data))
      })
      .then(() => {
        dispatch({ type: REDIRECT_FROM_REFACTOR })
      })
      .catch(err => {
        dispatch(editCitiesFailure(err.response.data))
      })
  }
}

export const deleteCityFromDB = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_CITIES_STARTED })
    axios
      .delete(`http://localhost:3000/api/cities/id?id=${id}`)
      .then(res => {
        dispatch(deleteCitiesSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteCitiesFailure(err.response.data))
      })
  }
}

const loadCitiesFailure = err => ({
  type: LOAD_CITIES_FAILURE,
  payload: err
})

const loadCitiesSuccess = data => ({
  type: LOAD_CITIES_SUCCESS,
  payload: data
})

const addCitiesFailure = (err) => ({
  type: ADD_CITIES_FAILURE,
  payload: err
})

const deleteCitiesFailure = (err) => ({
  type: DELETE_CITIES_FAILURE,
  payload: err
})

const editCitiesFailure = (err) => ({
  type: EDIT_CITIES_FAILURE,
  payload: err
})

const addCitiesSuccess = data => ({
  type: ADD_CITIES_SUCCESS,
  message: 'City was successfully added.',
  payload: data
})

const deleteCitiesSuccess = data => ({
  type: DELETE_CITIES_SUCCESS,
  message: 'City was successfully removed.',
  payload: data
})

const editCitiesSuccess = data => ({
  type: EDIT_CITIES_SUCCESS,
  message: 'City was successfully edited.',
  payload: data
})
