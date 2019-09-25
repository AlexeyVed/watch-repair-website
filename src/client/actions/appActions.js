import {
  MAKE_ORDER_STARTED,
  MAKE_ORDER_FAILURE,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_WITH_MASTER_STARTED,
  MAKE_ORDER_WITH_MASTER_SUCCESS,
  MAKE_ORDER_WITH_MASTER_FAILURE,
  CHANGE_PAGE,
  SET_CHOOSE_WORKER,
  MISS_ERRORS,
  RETURN_HOME_PAGE,
  END_LOAD_DATA
} from './types.js'

import axios from 'axios'

export const makeOrder = (values) => {
  return (dispatch) => {
    values.cityId = Number(values.cityId)
    values.clockId = Number(values.clockId)
    values.time = Number(values.time)
    dispatch({ type: MAKE_ORDER_STARTED })
    return axios
      .post(`/api/orders/freeMasters`, values)
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
    dispatch({ type: MAKE_ORDER_WITH_MASTER_STARTED })
    return axios
      .post(`/api/orders/`, values)
      .then(res => {
        dispatch({ type: MAKE_ORDER_WITH_MASTER_SUCCESS })
      })
      .catch(err => {
        dispatch(makeOrderMasterFailure(err.response.data))
      })
  }
}

export const setPage = data => {
  return {
    type: CHANGE_PAGE,
    payload: data
  }
}

export const returnPageHome = () => {
  return { type: RETURN_HOME_PAGE }
}

export const setChooseWorker = id => ({
  type: SET_CHOOSE_WORKER,
  payload: id
})

export const missErrors = () => ({
  type: MISS_ERRORS
})

export const loadDataEnd = () => {
  return { type: END_LOAD_DATA }
}

export const makeOrderSuccess = (data) => ({
  type: MAKE_ORDER_SUCCESS,
  payload: data
})

export const makeOrderFailure = err => ({
  type: MAKE_ORDER_FAILURE,
  payload: err
})

export const makeOrderMasterFailure = err => ({
  type: MAKE_ORDER_WITH_MASTER_FAILURE,
  payload: err
})
