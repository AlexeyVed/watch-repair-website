import {
  LOAD_CUSTOMERS_STARTED,
  LOAD_CUSTOMERS_SUCCESS,
  LOAD_CUSTOMERS_FAILURE,
  ADD_CUSTOMER_STARTED,
  ADD_CUSTOMER_FAILURE,
  ADD_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_STARTED,
  DELETE_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_STARTED,
  EDIT_CUSTOMER_FAILURE,
  EDIT_CUSTOMER_SUCCESS,
  REDIRECT_FROM_REFACTOR,
  GET_CUSTOMER_STARTED,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAILURE
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

export const getCustomer = id => {
  return (dispatch) => {
    dispatch({ type: GET_CUSTOMER_STARTED })
    return axios
      .get(`/api/customers/${id}`)
      .then(res => {
        dispatch({ type: GET_CUSTOMER_SUCCESS, payload: res.data })
        return res.data
      })
      .catch(err => {
        dispatch({ type: GET_CUSTOMER_FAILURE, payload: err.response.data })
      })
  }
}

export const addCustomersToDB = (values) => {
  return (dispatch) => {
    dispatch({ type: ADD_CUSTOMER_STARTED })
    return axios
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
    dispatch({ type: EDIT_CUSTOMER_STARTED })
    return axios
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
    dispatch({ type: DELETE_CUSTOMER_STARTED })
    return axios
      .delete(`/api/customers/${id}`)
      .then(res => {
        dispatch(deleteCustomersSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteCustomersFailure(err.response.data))
      })
  }
}

export const loadCustomersFailure = err => ({
  type: LOAD_CUSTOMERS_FAILURE,
  payload: err
})

export const loadCustomersSuccess = data => ({
  type: LOAD_CUSTOMERS_SUCCESS,
  payload: data
})

export const addCustomersFailure = (err) => ({
  type: ADD_CUSTOMER_FAILURE,
  payload: err
})

export const deleteCustomersFailure = (err) => ({
  type: DELETE_CUSTOMER_FAILURE,
  payload: err
})

export const editCustomersFailure = (err) => ({
  type: EDIT_CUSTOMER_FAILURE,
  payload: err
})

export const addCustomersSuccess = data => ({
  type: ADD_CUSTOMER_SUCCESS,
  message: 'Customer was successfully added.',
  payload: data
})

export const deleteCustomersSuccess = data => ({
  type: DELETE_CUSTOMER_SUCCESS,
  message: 'Customer was successfully removed.',
  payload: data
})

export const editCustomersSuccess = data => ({
  type: EDIT_CUSTOMER_SUCCESS,
  message: 'Customer was successfully edited.',
  payload: data
})
