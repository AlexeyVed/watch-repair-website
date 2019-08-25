import {
  LOAD_ORDERS_STARTED,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_FAILURE,
  ADD_ORDERS_STARTED,
  ADD_ORDERS_FAILURE,
  ADD_ORDERS_SUCCESS,
  DELETE_ORDERS_STARTED,
  DELETE_ORDERS_FAILURE,
  DELETE_ORDERS_SUCCESS,
  EDIT_ORDERS_STARTED,
  EDIT_ORDERS_FAILURE,
  EDIT_ORDERS_SUCCESS,
  REDIRECT_FROM_REFACTOR
} from '../types.js'

import axios from 'axios'

export const loadOrders = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['authorization'] = token
    dispatch({ type: LOAD_ORDERS_STARTED })
    return axios
      .get(`http://localhost:3000/api/orders/`)
      .then(res => {
        dispatch(loadOrdersSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadOrdersFailure(err.response.data))
      })
  }
}

export const addOrdersToDB = (values) => {
  values.time = Number(values.time)
  values.masterID = Number(values.masterID)
  return (dispatch) => {
    dispatch({ type: ADD_ORDERS_STARTED })

    axios
      .post(`http://localhost:3000/api/orders/admin`, values)
      .then(res => {
        dispatch(addOrdersSuccess(res.data))
      })
      .then(() => {
        dispatch({ type: REDIRECT_FROM_REFACTOR })
      })
      .catch(err => {
        dispatch(addOrdersFailure(err.response.data))
      })
  }
}

export const editOrdersIntoDB = (values) => {
  values.clockId = Number(values.clockId)
  values.cityId = Number(values.cityId)
  values.customerId = Number(values.customerId)
  values.masterId = Number(values.masterId)
  return (dispatch) => {
    dispatch({ type: EDIT_ORDERS_STARTED })
    axios
      .put(`http://localhost:3000/api/orders/id?id=${values.id}`, values)
      .then(res => {
        dispatch(editOrdersSuccess(res.data))
      })
      .then(() => {
        dispatch({ type: REDIRECT_FROM_REFACTOR })
      })
      .catch(err => {
        dispatch(editOrdersFailure(err.response.data))
      })
  }
}

export const deleteOrdersFromDB = (id) => {
  return (dispatch) => {
    dispatch({ type: DELETE_ORDERS_STARTED })
    axios
      .delete(`http://localhost:3000/api/orders/id?id=${id}`)
      .then(res => {
        dispatch(deleteOrdersSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteOrdersFailure(err.response.data))
      })
  }
}

const loadOrdersFailure = err => ({
  type: LOAD_ORDERS_FAILURE,
  payload: err
})

const loadOrdersSuccess = data => ({
  type: LOAD_ORDERS_SUCCESS,
  payload: data
})

const addOrdersFailure = (err) => ({
  type: ADD_ORDERS_FAILURE,
  payload: err
})

const deleteOrdersFailure = (err) => ({
  type: DELETE_ORDERS_FAILURE,
  payload: err
})

const editOrdersFailure = (err) => ({
  type: EDIT_ORDERS_FAILURE,
  payload: err
})

const addOrdersSuccess = data => ({
  type: ADD_ORDERS_SUCCESS,
  message: 'Order was successfully added.',
  payload: data
})

const deleteOrdersSuccess = data => ({
  type: DELETE_ORDERS_SUCCESS,
  message: 'Order was successfully removed.',
  payload: data
})

const editOrdersSuccess = data => ({
  type: EDIT_ORDERS_SUCCESS,
  message: 'Order was successfully edited.',
  payload: data
})
