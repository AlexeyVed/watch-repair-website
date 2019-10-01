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
  REDIRECT_FROM_REFACTOR,
  GET_ORDER_FOR_EDIT_STARTED,
  GET_ORDER_FOR_EDIT_SUCCESS,
  GET_ORDER_FOR_EDIT_FAILURE
} from '../types.js'

import axios from 'axios'

export const loadOrders = () => {
  return (dispatch) => {
    dispatch({ type: LOAD_ORDERS_STARTED })
    return axios
      .get(`/api/orders/`)
      .then(res => {
        dispatch(loadOrdersSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadOrdersFailure(err.response.data))
      })
  }
}

export const getOrder = id => {
  return (dispatch) => {
    dispatch({ type: GET_ORDER_FOR_EDIT_STARTED })
    return axios
      .get(`/api/orders/${id}`)
      .then(res => {
        dispatch({ type: GET_ORDER_FOR_EDIT_SUCCESS })
        return res.data
      })
      .catch(err => {
        dispatch({ type: GET_ORDER_FOR_EDIT_FAILURE, payload: err.response.data })
      })
  }
}

export const addOrdersToDB = (values) => {
  values.time = Number(values.time)
  values.masterID = Number(values.masterID)
  return (dispatch) => {
    dispatch({ type: ADD_ORDERS_STARTED })
    return axios
      .post(`/api/orders/admin`, values)
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
    return axios
      .put(`/api/orders/${values.id}`, values)
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
    return axios
      .delete(`/api/orders/${id}`)
      .then(res => {
        dispatch(deleteOrdersSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteOrdersFailure(err.response.data))
      })
  }
}

export const loadOrdersFailure = err => ({
  type: LOAD_ORDERS_FAILURE,
  payload: err
})

export const loadOrdersSuccess = data => ({
  type: LOAD_ORDERS_SUCCESS,
  payload: data
})

export const addOrdersFailure = (err) => ({
  type: ADD_ORDERS_FAILURE,
  payload: err
})

export const deleteOrdersFailure = (err) => ({
  type: DELETE_ORDERS_FAILURE,
  payload: err
})

export const editOrdersFailure = (err) => ({
  type: EDIT_ORDERS_FAILURE,
  payload: err
})

export const addOrdersSuccess = data => ({
  type: ADD_ORDERS_SUCCESS,
  message: 'Order was successfully added.',
  payload: data
})

export const deleteOrdersSuccess = data => ({
  type: DELETE_ORDERS_SUCCESS,
  message: 'Order was successfully removed.',
  payload: data
})

export const editOrdersSuccess = data => ({
  type: EDIT_ORDERS_SUCCESS,
  message: 'Order was successfully edited.',
  payload: data
})
