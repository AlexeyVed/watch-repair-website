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
  EDIT_CITIES_SUCCESS
} from './types.js'

import axios from 'axios'

export const loadCities = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['authorization'] = token
    }
    dispatch(loadCitiesStarted())
    return axios
      .get(`http://localhost:3000/api/cities/list`)
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
    dispatch(addCitiesStarted())
    axios
      .post(`http://localhost:3000/api/cities/add`, values)
      .then(res => {
        dispatch(addCitiesSuccess(res.data))
      })
      .catch(err => {
        dispatch(addCitiesFailure(err.response.data))
      })
  }
}

export const editCityIntoDB = (values) => {
  return (dispatch) => {
    dispatch(editCitiesStarted())
    axios
      .post(`http://localhost:3000/api/cities/update`, values)
      .then(res => {
        dispatch(editCitiesSuccess(res.data))
      })
      .catch(err => {
        dispatch(editCitiesFailure(err.response.data))
      })
  }
}

export const deleteCityFromDB = (id) => {
  return (dispatch) => {
    dispatch(deleteCitiesStarted())
    axios
      .post(`http://localhost:3000/api/cities/delete`, { id })
      .then(res => {
        dispatch(deleteCitiesSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteCitiesFailure(err.response.data))
      })
  }
}

const loadCitiesStarted = () => ({
  type: LOAD_CITIES_STARTED
})

const loadCitiesFailure = err => ({
  type: LOAD_CITIES_FAILURE,
  payload: err
})

const loadCitiesSuccess = data => ({
  type: LOAD_CITIES_SUCCESS,
  payload: data
})

const addCitiesStarted = () => ({
  type: ADD_CITIES_STARTED
})

const addCitiesFailure = (err) => ({
  type: ADD_CITIES_FAILURE,
  payload: err
})

const deleteCitiesStarted = () => ({
  type: DELETE_CITIES_STARTED
})

const deleteCitiesFailure = (err) => ({
  type: DELETE_CITIES_FAILURE,
  payload: err
})

const editCitiesStarted = () => ({
  type: EDIT_CITIES_STARTED
})

const editCitiesFailure = (err) => ({
  type: EDIT_CITIES_FAILURE,
  payload: err
})

const addCitiesSuccess = data => ({
  type: ADD_CITIES_SUCCESS,
  payload: data
})

const deleteCitiesSuccess = data => ({
  type: DELETE_CITIES_SUCCESS,
  payload: data
})

const editCitiesSuccess = data => ({
  type: EDIT_CITIES_SUCCESS,
  payload: data
})
