import {
  LOAD_CITIES_STARTED,
  LOAD_CITIES_SUCCESS,
  LOAD_CITIES_FAILURE,
  LOAD_CLOCKS_STARTED,
  LOAD_CLOCKS_SUCCESS,
  LOAD_CLOCKS_FAILURE,
  LOAD_WORKERS_STARTED,
  LOAD_WORKERS_SUCCESS,
  LOAD_WORKERS_FAILURE,
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

export const loadClocks = () => {
  return (dispatch) => {
    dispatch(loadClocksStarted())
    axios
      .get(`http://localhost:3000/api/clocks/list`)
      .then(res => {
        dispatch(loadClocksSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadClocksFailure(err.response.data))
      })
  }
}

export const loadCities = () => {
  return (dispatch) => {
    dispatch(loadCitiesStarted())
    axios
      .get(`http://localhost:3000/api/cities/list`)
      .then(res => {
        dispatch(loadCitiesSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadCitiesFailure(err.response.data))
      })
  }
}

export const loadWorkers = () => {
  return (dispatch) => {
    dispatch(loadWorkersStarted())
    axios
      .get(`http://localhost:3000/api/workers/list`)
      .then(res => {
        dispatch(loadWorkersSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadWorkersFailure(err.response.data))
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

const loadClocksStarted = () => ({
  type: LOAD_CLOCKS_STARTED
})

const loadClocksSuccess = data => ({
  type: LOAD_CLOCKS_SUCCESS,
  payload: data
})

const loadClocksFailure = err => ({
  type: LOAD_CLOCKS_FAILURE,
  payload: err
})

const loadCitiesStarted = () => ({
  type: LOAD_CITIES_STARTED
})

const loadCitiesSuccess = data => ({
  type: LOAD_CITIES_SUCCESS,
  payload: data
})

const loadCitiesFailure = err => ({
  type: LOAD_CITIES_FAILURE,
  payload: err
})

const loadWorkersStarted = () => ({
  type: LOAD_WORKERS_STARTED
})

const loadWorkersSuccess = data => ({
  type: LOAD_WORKERS_SUCCESS,
  payload: data
})

const loadWorkersFailure = err => ({
  type: LOAD_WORKERS_FAILURE,
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
