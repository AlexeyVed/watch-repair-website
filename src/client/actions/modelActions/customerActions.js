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
  EDIT_CUSTOMERS_SUCCESS
} from './types.js'

import axios from 'axios'

export const loadCustomers = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['authorization'] = token
    }
    dispatch(loadCustomersStarted())
    return axios
      .get(`http://localhost:3000/api/customers/list`)
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
    dispatch(addCustomersStarted())
    axios
      .post(`http://localhost:3000/api/customers/add`, values)
      .then(res => {
        dispatch(addCustomersSuccess(res.data))
      })
      .catch(err => {
        dispatch(addCustomersFailure(err.response.data))
      })
  }
}

export const editCustomersIntoDB = (values) => {
  return (dispatch) => {
    dispatch(editCustomersStarted())
    axios
      .post(`http://localhost:3000/api/customers/update`, values)
      .then(res => {
        dispatch(editCustomersSuccess(res.data))
      })
      .catch(err => {
        dispatch(editCustomersFailure(err.response.data))
      })
  }
}

export const deleteCustomersFromDB = (id) => {
  return (dispatch) => {
    dispatch(deleteCustomersStarted())
    axios
      .post(`http://localhost:3000/api/customers/delete`, { id })
      .then(res => {
        dispatch(deleteCustomersSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteCustomersFailure(err.response.data))
      })
  }
}

const loadCustomersStarted = () => ({
  type: LOAD_CUSTOMERS_STARTED
})

const loadCustomersFailure = err => ({
  type: LOAD_CUSTOMERS_FAILURE,
  payload: err
})

const loadCustomersSuccess = data => ({
  type: LOAD_CUSTOMERS_SUCCESS,
  payload: data
})

const addCustomersStarted = () => ({
  type: ADD_CUSTOMERS_STARTED
})

const addCustomersFailure = (err) => ({
  type: ADD_CUSTOMERS_FAILURE,
  payload: err
})

const deleteCustomersStarted = () => ({
  type: DELETE_CUSTOMERS_STARTED
})

const deleteCustomersFailure = (err) => ({
  type: DELETE_CUSTOMERS_FAILURE,
  payload: err
})

const editCustomersStarted = () => ({
  type: EDIT_CUSTOMERS_STARTED
})

const editCustomersFailure = (err) => ({
  type: EDIT_CUSTOMERS_FAILURE,
  payload: err
})

const addCustomersSuccess = data => ({
  type: ADD_CUSTOMERS_SUCCESS,
  payload: data
})

const deleteCustomersSuccess = data => ({
  type: DELETE_CUSTOMERS_SUCCESS,
  payload: data
})

const editCustomersSuccess = data => ({
  type: EDIT_CUSTOMERS_SUCCESS,
  payload: data
})