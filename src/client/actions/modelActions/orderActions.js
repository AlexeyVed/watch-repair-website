import {
  LOAD_ORDERS_STARTED,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_FAILURE,
  ADD_ORDER_STARTED,
  ADD_ORDER_FAILURE,
  ADD_ORDER_SUCCESS,
  DELETE_ORDER_STARTED,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_SUCCESS,
  EDIT_ORDER_STARTED,
  EDIT_ORDER_FAILURE,
  EDIT_ORDER_SUCCESS,
  REDIRECT_FROM_REFACTOR,
  GET_ORDER_STARTED,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE,
  LOAD_DATA_FOR_DASHBOARD_STARTED,
  LOAD_DATA_FOR_DASHBOARD_SUCCESS,
  LOAD_DATA_FOR_DASHBOARD_FAILURE
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

export const loadForDashboard = date => {
  return (dispatch) => {
    dispatch({ type: LOAD_DATA_FOR_DASHBOARD_STARTED })
    return axios
      .get(`/api/orders/?date=${date}`)
      .then(res => {
        dispatch({ type: LOAD_DATA_FOR_DASHBOARD_SUCCESS, payload: res.data })
      })
      .catch(err => {
        dispatch({ type: LOAD_DATA_FOR_DASHBOARD_FAILURE, payload: err.response.data })
      })
  }
}

export const getOrder = id => {
  return (dispatch) => {
    dispatch({ type: GET_ORDER_STARTED })
    return axios
      .get(`/api/orders/${id}`)
      .then(res => {
        dispatch({ type: GET_ORDER_SUCCESS, payload: res.data })
        return res.data
      })
      .catch(err => {
        dispatch({ type: GET_ORDER_FAILURE, payload: err.response.data })
      })
  }
}

export const addOrdersToDB = (values) => {
  return (dispatch) => {
    dispatch({ type: ADD_ORDER_STARTED })
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
  return (dispatch) => {
    dispatch({ type: EDIT_ORDER_STARTED })
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
    dispatch({ type: DELETE_ORDER_STARTED })
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
  type: ADD_ORDER_FAILURE,
  payload: err
})

export const deleteOrdersFailure = (err) => ({
  type: DELETE_ORDER_FAILURE,
  payload: err
})

export const editOrdersFailure = (err) => ({
  type: EDIT_ORDER_FAILURE,
  payload: err
})

export const addOrdersSuccess = data => ({
  type: ADD_ORDER_SUCCESS,
  message: 'Order was successfully added.',
  payload: data
})

export const deleteOrdersSuccess = data => ({
  type: DELETE_ORDER_SUCCESS,
  message: 'Order was successfully removed.',
  payload: data
})

export const editOrdersSuccess = data => ({
  type: EDIT_ORDER_SUCCESS,
  message: 'Order was successfully edited.',
  payload: data
})
