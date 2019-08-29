import {
  LOAD_CUSTOMERS_STARTED,
  LOAD_CUSTOMERS_SUCCESS,
  LOAD_CUSTOMERS_FAILURE,
  ADD_CUSTOMERS_STARTED,
  ADD_CUSTOMERS_FAILURE,
  ADD_CUSTOMERS_SUCCESS,
  DELETE_CUSTOMERS_STARTED,
  DELETE_CUSTOMERS_FAILURE,
  DELETE_CUSTOMERS_SUCCESS,
  EDIT_CUSTOMERS_STARTED,
  EDIT_CUSTOMERS_FAILURE,
  EDIT_CUSTOMERS_SUCCESS,
  REDIRECT_FROM_REFACTOR
} from '../types.js'

import axios from 'axios'

export const loadCustomers = () => {
  return (dispatch) => {
    dispatch({ type: LOAD_CUSTOMERS_STARTED })
    return axios
      .get(`/api/customers/`)
      .then(res => {
        dispatch(loadCustomersSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadCustomersFailure(err.response.data))
      })
  }
}

export const addCustomersToDB = (values) => {
  return (dispatch) => {
    dispatch({ type: ADD_CUSTOMERS_STARTED })
    axios
      .post(`/api/customers/`, values)
      .then(res => {
        dispatch(addCustomersSuccess(res.data))
      })
      .then(() => {
        dispatch({ type: REDIRECT_FROM_REFACTOR })
      })
      .catch(err => {
        dispatch(addCustomersFailure(err.response.data))
      })
  }
}

export const editCustomersIntoDB = (values) => {
  return (dispatch) => {
    dispatch({ type: EDIT_CUSTOMERS_STARTED })
    axios
      .put(`/api/customers/${values.id}`, values)
      .then(res => {
        dispatch(editCustomersSuccess(res.data))
      })
      .then(() => {
        dispatch({ type: REDIRECT_FROM_REFACTOR })
      })
      .catch(err => {
        dispatch(editCustomersFailure(err.response.data))
      })
  }
}

export const deleteCustomersFromDB = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_CUSTOMERS_STARTED })
    axios
      .delete(`/api/customers/${id}`)
      .then(res => {
        dispatch(deleteCustomersSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteCustomersFailure(err.response.data))
      })
  }
}

const loadCustomersFailure = err => ({
  type: LOAD_CUSTOMERS_FAILURE,
  payload: err
})

const loadCustomersSuccess = data => ({
  type: LOAD_CUSTOMERS_SUCCESS,
  payload: data
})

const addCustomersFailure = (err) => ({
  type: ADD_CUSTOMERS_FAILURE,
  payload: err
})

const deleteCustomersFailure = (err) => ({
  type: DELETE_CUSTOMERS_FAILURE,
  payload: err
})

const editCustomersFailure = (err) => ({
  type: EDIT_CUSTOMERS_FAILURE,
  payload: err
})

const addCustomersSuccess = data => ({
  type: ADD_CUSTOMERS_SUCCESS,
  message: 'Customer was successfully added.',
  payload: data
})

const deleteCustomersSuccess = data => ({
  type: DELETE_CUSTOMERS_SUCCESS,
  message: 'Customer was successfully removed.',
  payload: data
})

const editCustomersSuccess = data => ({
  type: EDIT_CUSTOMERS_SUCCESS,
  message: 'Customer was successfully edited.',
  payload: data
})
