import {
  LOAD_DATA_USER_STARTED,
  LOAD_DATA_USER_SUCCESS,
  LOAD_DATA_USER_FAILURE,
  MAKE_ORDER_STARTED,
  MAKE_ORDER_FAILURE,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_WITH_MASTER_STARTED,
  MAKE_ORDER_WITH_MASTER_SUCCESS,
  MAKE_ORDER_WITH_MASTER_FAILURE
} from './types.js'

import axios from 'axios'

export const makeOrder = (values) => {
  return (dispatch) => {
    dispatch(makeOrderStarted())
    axios
      .post(`http://localhost:3000/api/orders/addOrder`, values)
      .then(res => {
        dispatch(makeOrderSuccess())
      })
      .catch(err => {
        dispatch(makeOrderFailure(err.response.data))
      })
  }
}

export const loadDataUser = () => {
  return (dispatch) => {
    dispatch(loadDataStarted())
    axios
      .get(`http://localhost:3000/api/data/getData`)
      .then(res => {
        dispatch(loadDataSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadDataFailure(err.response.data))
      })
  }
}

const loadDataStarted = () => ({
  type: LOAD_DATA_USER_STARTED
})

const loadDataSuccess = data => ({
  type: LOAD_DATA_USER_SUCCESS,
  payload: data
})

const loadDataFailure = err => ({
  type: LOAD_DATA_USER_FAILURE,
  payload: err
})

const makeOrderStarted = () => ({
  type: MAKE_ORDER_STARTED
})

const makeOrderSuccess = (data) => ({
  type: MAKE_ORDER_SUCCESS,
  payload: data
})

const makeOrderFailure = err => ({
  type: MAKE_ORDER_FAILURE,
  payload: err
})

const makeOrderMasterStarted = () => ({
  type: MAKE_ORDER_WITH_MASTER_STARTED
})

const makeOrderMasterSuccess = data => ({
  type: MAKE_ORDER_WITH_MASTER_SUCCESS,
  payload: data
})

const makeOrderMasterFailure = err => ({
  type: MAKE_ORDER_WITH_MASTER_FAILURE,
  payload: err
})
