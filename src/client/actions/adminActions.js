import {
  LOAD_DATA_FAILURE,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_STARTED,
  ADD_MODEL_STARTED,
  ADD_MODEL_SUCCESS,
  ADD_MODEL_FAILURE,
  DELETE_MODEL_STARTED,
  DELETE_MODEL_SUCCESS,
  DELETE_MODEL_FAILURE
} from './types.js'

import axios from 'axios'

export const loadDataAdmin = () => {
  return (dispatch) => {
    dispatch(loadDataStarted())
    axios
      .get(`http://localhost:4000/data/getAll`)
      .then(res => {
        dispatch(loadDataSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadDataFailure(err.response.data))
      })
  }
}

export const addUserToDB = (email, password) => {
  return (dispatch) => {
    dispatch(addModelStarted())
    axios
      .post(`http://localhost:4000/users/addUser`, { email, password })
      .then(res => {
        dispatch(addModelSuccess())
      })
      .then(res => {
        dispatch(loadDataAdmin())
      })
      .catch(err => {
        dispatch(addModelFailure(err))
      })
  }
}

export const addCityToDB = (city) => {
  return (dispatch) => {
    dispatch(addModelStarted())
    axios
      .post(`http://localhost:4000/cities/addCity`, { city })
      .then(res => {
        dispatch(addModelSuccess())
      })
      .then(res => {
        dispatch(loadDataAdmin())
      })
      .catch(err => {
        dispatch(addModelFailure(err))
      })
  }
}

export const addClockToDB = (typeClock, timeRepair) => {
  return (dispatch) => {
    dispatch(addModelStarted())
    axios
      .post(`http://localhost:4000/clocks/addClock`, { typeClock, timeRepair })
      .then(res => {
        dispatch(addModelSuccess())
      })
      .then(res => {
        dispatch(loadDataAdmin())
      })
      .catch(err => {
        dispatch(addModelFailure(err))
      })
  }
}

export const addWorkerToDB = (name, city, rating) => {
  return (dispatch) => {
    dispatch(addModelStarted())
    axios
      .post(`http://localhost:4000/workers/addWorker`, { name, city, rating })
      .then(res => {
        dispatch(addModelSuccess())
      })
      .then(res => {
        dispatch(loadDataAdmin())
      })
      .catch(err => {
        dispatch(addModelFailure(err))
      })
  }
}

export const deleteClockFromDB = (id) => {
  return (dispatch) => {
    dispatch(deleteModelStarted())
    axios
      .post(`http://localhost:4000/clocks/deleteClock`, { id })
      .then(res => {
        dispatch(deleteModelSuccess())
      })
      .then(res => {
        dispatch(loadDataAdmin())
      })
      .catch(err => {
        dispatch(deleteModelFailure(err))
      })
  }
}

export const deleteWorkerFromDB = (id) => {
  return (dispatch) => {
    dispatch(deleteModelStarted())
    axios
      .post(`http://localhost:4000/workers/deleteWorker`, { id })
      .then(res => {
        dispatch(deleteModelSuccess())
      })
      .then(res => {
        dispatch(loadDataAdmin())
      })
      .catch(err => {
        dispatch(deleteModelFailure(err))
      })
  }
}

export const deleteCityFromDB = (id) => {
  return (dispatch) => {
    dispatch(deleteModelStarted())
    axios
      .post(`http://localhost:4000/cities/deleteCity`, { id })
      .then(res => {
        dispatch(deleteModelSuccess())
      })
      .then(res => {
        dispatch(loadDataAdmin())
      })
      .catch(err => {
        dispatch(deleteModelFailure(err))
      })
  }
}

export const deleteClientFromDB = (id) => {
  return (dispatch) => {
    dispatch(deleteModelStarted())
    axios
      .post(`http://localhost:4000/users/deleteUser`, { id })
      .then(res => {
        dispatch(deleteModelSuccess())
      })
      .then(res => {
        dispatch(loadDataAdmin())
      })
      .catch(err => {
        dispatch(deleteModelFailure(err))
      })
  }
}

const loadDataStarted = () => ({
  type: LOAD_DATA_STARTED
})

const loadDataFailure = err => ({
  type: LOAD_DATA_FAILURE,
  payload: err
})

const loadDataSuccess = data => ({
  type: LOAD_DATA_SUCCESS,
  payload: data
})

const addModelStarted = () => ({
  type: ADD_MODEL_STARTED
})

const addModelFailure = () => ({
  type: ADD_MODEL_FAILURE
})

const addModelSuccess = err => ({
  type: ADD_MODEL_SUCCESS,
  payload: err
})

const deleteModelStarted = () => ({
  type: DELETE_MODEL_STARTED
})

const deleteModelFailure = () => ({
  type: DELETE_MODEL_FAILURE
})

const deleteModelSuccess = err => ({
  type: DELETE_MODEL_SUCCESS,
  payload: err
})
