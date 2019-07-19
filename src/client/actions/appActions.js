import {
  LOAD_DATA_USER_STARTED,
  LOAD_DATA_USER_SUCCESS,
  LOAD_DATA_USER_FAILURE,
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
      .post(`http://localhost:3000/api/orders/makeOrder`, values)
      .then(res => {
        dispatch(makeOrderSuccess(res.data))
      })
      .catch(err => {
        dispatch(makeOrderFailure(err.response.data))
      })
  }
}

export const addOrder = (idMaster, id) => {
  return (dispatch) => {
    dispatch(makeOrderMasterStarted())
    axios
      .post(`http://localhost:3000/api/orders/addOrder`, { idMaster, id })
      .then(res => {
        dispatch(makeOrderMasterSuccess())
      })
      .catch(err => {
        dispatch(makeOrderMasterFailure(err.response.data))
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

export const changePage = data => ({
  type: CHANGE_PAGE,
  payload: data
})

export const setChooseWorker = id => ({
  type: SET_CHOOSE_WORKER,
  payload: id
})

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

const makeOrderMasterSuccess = () => ({
  type: MAKE_ORDER_WITH_MASTER_SUCCESS
})

const makeOrderMasterFailure = err => ({
  type: MAKE_ORDER_WITH_MASTER_FAILURE,
  payload: err
})
