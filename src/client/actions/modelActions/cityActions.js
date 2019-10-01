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
  REDIRECT_FROM_REFACTOR,
  GET_CITY_FOR_EDIT_STARTED,
  GET_CITY_FOR_EDIT_SUCCESS,
  GET_CITY_FOR_EDIT_FAILURE
} from '../types.js'

import axios from 'axios'

export const loadCities = () => {
  return (dispatch) => {
    dispatch({ type: LOAD_CITIES_STARTED })
    return axios
      .get(`/api/cities/`)
      .then(res => {
        dispatch(loadCitiesSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadCitiesFailure(err.response.data))
      })
  }
}

export const getCity = id => {
  return (dispatch) => {
    dispatch({ type: GET_CITY_FOR_EDIT_STARTED })
    return axios
      .get(`/api/cities/${id}`)
      .then(res => {
        dispatch({ type: GET_CITY_FOR_EDIT_SUCCESS })
        return res.data
      })
      .catch(err => {
        dispatch({ type: GET_CITY_FOR_EDIT_FAILURE, payload: err.response.data })
      })
  }
}

export const addCityToDB = (values) => {
  return (dispatch) => {
    dispatch({ type: ADD_CITIES_STARTED })
    return axios
      .post(`/api/cities/`, values)
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
    return axios
      .put(`/api/cities/${values.id}`, values)
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
    return axios
      .delete(`/api/cities/${id}`)
      .then(res => {
        dispatch(deleteCitiesSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteCitiesFailure(err.response.data))
      })
  }
}

export const loadCitiesFailure = err => ({
  type: LOAD_CITIES_FAILURE,
  payload: err
})

export const loadCitiesSuccess = data => ({
  type: LOAD_CITIES_SUCCESS,
  payload: data
})

export const addCitiesFailure = (err) => ({
  type: ADD_CITIES_FAILURE,
  payload: err
})

export const deleteCitiesFailure = (err) => ({
  type: DELETE_CITIES_FAILURE,
  payload: err
})

export const editCitiesFailure = (err) => ({
  type: EDIT_CITIES_FAILURE,
  payload: err
})

export const addCitiesSuccess = data => ({
  type: ADD_CITIES_SUCCESS,
  message: 'City was successfully added.',
  payload: data
})

export const deleteCitiesSuccess = data => ({
  type: DELETE_CITIES_SUCCESS,
  message: 'City was successfully removed.',
  payload: data
})

export const editCitiesSuccess = data => ({
  type: EDIT_CITIES_SUCCESS,
  message: 'City was successfully edited.',
  payload: data
})
