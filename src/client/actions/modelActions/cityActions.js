import {
  LOAD_CITIES_STARTED,
  LOAD_CITIES_SUCCESS,
  LOAD_CITIES_FAILURE,
  ADD_CITY_STARTED,
  ADD_CITY_FAILURE,
  ADD_CITY_SUCCESS,
  DELETE_CITY_STARTED,
  DELETE_CITY_FAILURE,
  DELETE_CITY_SUCCESS,
  EDIT_CITY_STARTED,
  EDIT_CITY_FAILURE,
  EDIT_CITY_SUCCESS,
  REDIRECT_FROM_REFACTOR,
  GET_CITY_STARTED,
  GET_CITY_SUCCESS,
  GET_CITY_FAILURE
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
    dispatch({ type: GET_CITY_STARTED })
    return axios
      .get(`/api/cities/${id}`)
      .then(res => {
        dispatch({ type: GET_CITY_SUCCESS, payload: res.data })
        return res.data
      })
      .catch(err => {
        dispatch({ type: GET_CITY_FAILURE, payload: err.response.data })
      })
  }
}

export const addCityToDB = (values) => {
  return (dispatch) => {
    dispatch({ type: ADD_CITY_STARTED })
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
    dispatch({ type: EDIT_CITY_STARTED })
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
    dispatch({ type: DELETE_CITY_STARTED })
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
  type: ADD_CITY_FAILURE,
  payload: err
})

export const deleteCitiesFailure = (err) => ({
  type: DELETE_CITY_FAILURE,
  payload: err
})

export const editCitiesFailure = (err) => ({
  type: EDIT_CITY_FAILURE,
  payload: err
})

export const addCitiesSuccess = data => ({
  type: ADD_CITY_SUCCESS,
  message: 'City was successfully added.',
  payload: data
})

export const deleteCitiesSuccess = data => ({
  type: DELETE_CITY_SUCCESS,
  message: 'City was successfully removed.',
  payload: data
})

export const editCitiesSuccess = data => ({
  type: EDIT_CITY_SUCCESS,
  message: 'City was successfully edited.',
  payload: data
})
