import {
  MAKE_ORDER_STARTED,
  MAKE_ORDER_FAILURE,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_WITH_MASTER_STARTED,
  MAKE_ORDER_WITH_MASTER_SUCCESS,
  MAKE_ORDER_WITH_MASTER_FAILURE,
  CHANGE_PAGE,
  SET_CHOOSE_WORKER
} from './types.js'

import axios from 'axios'

export const makeOrder = (values) => {
  return (dispatch) => {
    values.timeRepair = Number(values.timeRepair)
    values.time = Number(values.time)
    dispatch(makeOrderStarted())
    axios
      .post(`http://localhost:3000/api/orders/make`, values)
      .then(res => {
        dispatch(makeOrderSuccess(res.data))
      })
      .catch(err => {
        dispatch(makeOrderFailure(err.response.data))
      })
  }
}

export const addOrder = (values) => {
  return (dispatch) => {
    dispatch(makeOrderMasterStarted())
    axios
      .post(`http://localhost:3000/api/orders/add`, values)
      .then(res => {
        dispatch(makeOrderMasterSuccess())
      })
      .catch(err => {
        dispatch(makeOrderMasterFailure(err.response.data))
      })
  }
}

export const changePage = data => ({
  type: CHANGE_PAGE,
  payload: data
})

export const setChooseWorker = id => ({
  type: SET_CHOOSE_WORKER,
  payload: id
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

const makeOrderMasterSuccess = () => ({
  type: MAKE_ORDER_WITH_MASTER_SUCCESS
})

const makeOrderMasterFailure = err => ({
  type: MAKE_ORDER_WITH_MASTER_FAILURE,
  payload: err
})
