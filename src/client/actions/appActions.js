import {
  MAKE_ORDER_STARTED,
  MAKE_ORDER_FAILURE,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_WITH_MASTER_STARTED,
  MAKE_ORDER_WITH_MASTER_SUCCESS,
  MAKE_ORDER_WITH_MASTER_FAILURE,
  CHANGE_PAGE,
  SET_CHOOSE_WORKER,
  MISS_APP_ERROR,
  RETURN_HOME_PAGE
} from './types.js'

import axios from 'axios'

export const makeOrder = (values) => {
  return (dispatch) => {
    values.cityId = Number(values.cityId)
    values.clockId = Number(values.clockId)
    values.time = Number(values.time)
    dispatch(makeOrderStarted())
    axios
      .post(`http://localhost:3000/api/orders/getWorkers`, values)
      .then(res => {
        const obj = {
          data: res.data,
          values
        }
        dispatch(makeOrderSuccess(obj))
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

export const missErrorApp = () => {
  return (dispatch) => {
    dispatch(missAppError())
  }
}

export const setPage = data => {
  return (dispatch) => {
    dispatch(changePage(data))
  }
}

export const returnPageHome = () => {
  return (dispatch) => {
    dispatch(returnHomePage())
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

const missAppError = () => ({
  type: MISS_APP_ERROR
})

const returnHomePage = () => ({
  type: RETURN_HOME_PAGE
})
