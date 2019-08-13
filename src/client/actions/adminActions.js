import {
  LOAD_CLOCKS_ADMIN_STARTED,
  LOAD_CLOCKS_ADMIN_SUCCESS,
  LOAD_CLOCKS_ADMIN_FAILURE,
  LOAD_CITIES_ADMIN_STARTED,
  LOAD_CITIES_ADMIN_SUCCESS,
  LOAD_CITIES_ADMIN_FAILURE,
  LOAD_ORDERS_ADMIN_STARTED,
  LOAD_ORDERS_ADMIN_SUCCESS,
  LOAD_ORDERS_ADMIN_FAILURE,
  LOAD_CUSTOMERS_ADMIN_STARTED,
  LOAD_CUSTOMERS_ADMIN_SUCCESS,
  LOAD_CUSTOMERS_ADMIN_FAILURE,
  LOAD_WORKERS_ADMIN_STARTED,
  LOAD_WORKERS_ADMIN_SUCCESS,
  LOAD_WORKERS_ADMIN_FAILURE,
  ADD_MODEL_STARTED,
  ADD_MODEL_FAILURE,
  ADD_CITIES_SUCCESS,
  ADD_CLIENTS_SUCCESS,
  ADD_CLOCKS_SUCCESS,
  ADD_ORDERS_SUCCESS,
  ADD_WORKERS_SUCCESS,
  DELETE_MODEL_STARTED,
  DELETE_MODEL_FAILURE,
  DELETE_CITIES_SUCCESS,
  DELETE_CLIENTS_SUCCESS,
  DELETE_CLOCKS_SUCCESS,
  DELETE_ORDERS_SUCCESS,
  DELETE_WORKERS_SUCCESS,
  EDIT_MODEL_STARTED,
  EDIT_MODEL_FAILURE,
  EDIT_CITIES_SUCCESS,
  EDIT_CLIENTS_SUCCESS,
  EDIT_CLOCKS_SUCCESS,
  EDIT_ORDERS_SUCCESS,
  EDIT_WORKERS_SUCCESS,
  REDIRECT_FROM_REFACTOR,
  MISS_ADMIN_ERROR
  , MISS_APP_ERROR } from './types.js'

import axios from 'axios'

export const loadClocks = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['authorization'] = token
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
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['authorization'] = token
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

export const loadOrdersAdmin = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['authorization'] = token
    dispatch(loadOrdersStarted())
    axios
      .get(`http://localhost:3000/api/orders/list`)
      .then(res => {
        dispatch(loadOrdersSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadOrdersFailure(err.response.data))
      })
  }
}

export const loadWorkers = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['authorization'] = token
    dispatch(loadWorkersStarted())
    axios
      .get(`http://localhost:3000/api/masters/list`)
      .then(res => {
        dispatch(loadWorkersSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadWorkersFailure(err.response.data))
      })
  }
}

export const loadClientsAdmin = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    axios.defaults.headers.common['authorization'] = token
    dispatch(loadClientsStarted())
    axios
      .get(`http://localhost:3000/api/customers/list`)
      .then(res => {
        dispatch(loadClientsSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadClientsFailure(err.response.data))
      })
  }
}

export const addUserToDB = (values) => {
  return (dispatch) => {
    dispatch(addModelStarted())
    axios
      .post(`http://localhost:3000/api/customers/add`, values)
      .then(res => {
        dispatch(addUserSuccess(res.data))
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(addModelFailure(err.response.data))
      })
  }
}

export const addCityToDB = (values) => {
  return (dispatch) => {
    dispatch(addModelStarted())
    axios
      .post(`http://localhost:3000/api/cities/add`, values)
      .then(res => {
        dispatch(addCitySuccess(res.data))
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(addModelFailure(err.response.data))
      })
  }
}

export const addClockToDB = (values) => {
  return (dispatch) => {
    dispatch(addModelStarted())
    axios
      .post(`http://localhost:3000/api/clocks/add`, values)
      .then(res => {
        dispatch(addClockSuccess(res.data))
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(addModelFailure(err.response.data))
      })
  }
}

export const addWorkerToDB = (values) => {
  return (dispatch) => {
    dispatch(addModelStarted())
    axios
      .post(`http://localhost:3000/api/masters/add`, values)
      .then(res => {
        console.log(res.data)
        dispatch(addWorkerSuccess(res.data))
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(addModelFailure(err.response.data))
      })
  }
}

export const addOrderToDB = (values) => {
  values.time = Number(values.time)
  values.masterID = Number(values.masterID)
  return (dispatch) => {
    dispatch(addModelStarted())

    axios
      .post(`http://localhost:3000/api/orders/addAdmin`, values)
      .then(res => {
        dispatch(addOrderSuccess(res.data))
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(addModelFailure(err.response.data))
      })
  }
}

export const editUserIntoDB = (values) => {
  return (dispatch) => {
    dispatch(editModelStarted())
    axios
      .post(`http://localhost:3000/api/customers/update`, values)
      .then(res => {
        dispatch(editUserSuccess(res.data))
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(editModelFailure(err.response.data))
      })
  }
}

export const editCityIntoDB = (values) => {
  return (dispatch) => {
    dispatch(editModelStarted())
    axios
      .post(`http://localhost:3000/api/cities/update`, values)
      .then(res => {
        dispatch(editCitySuccess(res.data))
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(editModelFailure(err.response.data))
      })
  }
}

export const editClockIntoDB = (values) => {
  return (dispatch) => {
    dispatch(editModelStarted())
    axios
      .post(`http://localhost:3000/api/clocks/update`, values)
      .then(res => {
        dispatch(editClockSuccess(res.data))
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(editModelFailure(err.response.data))
      })
  }
}

export const editOrderIntoDB = (values) => {
  values.clockId = Number(values.clockId)
  values.cityId = Number(values.cityId)
  values.customerId = Number(values.customerId)
  values.masterId = Number(values.masterId)
  return (dispatch) => {
    dispatch(editModelStarted())
    axios
      .post(`http://localhost:3000/api/orders/update`, values)
      .then(res => {
        dispatch(editOrderSuccess(res.data))
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(editModelFailure(err.response.data))
      })
  }
}

export const editWorkerIntoDB = (values) => {
  return (dispatch) => {
    dispatch(editModelStarted())
    axios
      .post(`http://localhost:3000/api/masters/update`, values)
      .then(res => {
        dispatch(editWorkerSuccess(res.data))
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(editModelFailure(err.response.data))
      })
  }
}

export const deleteClockFromDB = (id) => {
  return (dispatch) => {
    dispatch(deleteModelStarted())
    axios
      .post(`http://localhost:3000/api/clocks/delete`, { id })
      .then(res => {
        dispatch(deleteClockSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteModelFailure(err.response.data))
      })
  }
}

export const deleteOrderFromDB = (id) => {
  return (dispatch) => {
    dispatch(deleteModelStarted())
    axios
      .post(`http://localhost:3000/api/orders/delete`, { id })
      .then(res => {
        dispatch(deleteOrderSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteModelFailure(err.response.data))
      })
  }
}

export const deleteWorkerFromDB = (id) => {
  return (dispatch) => {
    dispatch(deleteModelStarted())
    axios
      .post(`http://localhost:3000/api/masters/delete`, { id })
      .then(res => {
        dispatch(deleteWorkerSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteModelFailure(err.response.data))
      })
  }
}

export const deleteCityFromDB = (id) => {
  return (dispatch) => {
    dispatch(deleteModelStarted())
    axios
      .post(`http://localhost:3000/api/cities/delete`, { id })
      .then(res => {
        dispatch(deleteCitySuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteModelFailure(err.response.data))
      })
  }
}

export const deleteClientFromDB = (id) => {
  return (dispatch) => {
    dispatch(deleteModelStarted())
    axios
      .post(`http://localhost:3000/api/customers/delete`, { id })
      .then(res => {
        dispatch(deleteClientSuccess(res.data))
      })
      .catch(err => {
        dispatch(deleteModelFailure(err.response.data))
      })
  }
}

export const missErrorAdmin = () => {
  return (dispatch) => {
    dispatch(missAdminError())
  }
}

const loadClocksStarted = () => ({
  type: LOAD_CLOCKS_ADMIN_STARTED
})

const loadClocksFailure = err => ({
  type: LOAD_CLOCKS_ADMIN_FAILURE,
  payload: err
})

const loadClocksSuccess = data => ({
  type: LOAD_CLOCKS_ADMIN_SUCCESS,
  payload: data
})

const loadCitiesStarted = () => ({
  type: LOAD_CITIES_ADMIN_STARTED
})

const loadCitiesFailure = err => ({
  type: LOAD_CITIES_ADMIN_FAILURE,
  payload: err
})

const loadCitiesSuccess = data => ({
  type: LOAD_CITIES_ADMIN_SUCCESS,
  payload: data
})

const loadOrdersStarted = () => ({
  type: LOAD_ORDERS_ADMIN_STARTED
})

const loadOrdersFailure = err => ({
  type: LOAD_ORDERS_ADMIN_FAILURE,
  payload: err
})

const loadOrdersSuccess = data => ({
  type: LOAD_ORDERS_ADMIN_SUCCESS,
  payload: data
})

const loadClientsStarted = () => ({
  type: LOAD_CUSTOMERS_ADMIN_STARTED
})

const loadClientsFailure = err => ({
  type: LOAD_CUSTOMERS_ADMIN_FAILURE,
  payload: err
})

const loadClientsSuccess = data => ({
  type: LOAD_CUSTOMERS_ADMIN_SUCCESS,
  payload: data
})

const loadWorkersStarted = () => ({
  type: LOAD_WORKERS_ADMIN_STARTED
})

const loadWorkersFailure = err => ({
  type: LOAD_WORKERS_ADMIN_FAILURE,
  payload: err
})

const loadWorkersSuccess = data => ({
  type: LOAD_WORKERS_ADMIN_SUCCESS,
  payload: data
})

const addModelStarted = () => ({
  type: ADD_MODEL_STARTED
})

const addModelFailure = () => ({
  type: ADD_MODEL_FAILURE
})

const deleteModelStarted = () => ({
  type: DELETE_MODEL_STARTED
})

const deleteModelFailure = (err) => ({
  type: DELETE_MODEL_FAILURE,
  payload: err
})

const editModelStarted = () => ({
  type: EDIT_MODEL_STARTED
})

const editModelFailure = (err) => ({
  type: EDIT_MODEL_FAILURE,
  payload: err
})

const redirectFromRefactor = () => ({
  type: REDIRECT_FROM_REFACTOR
})

const addUserSuccess = data => ({
  type: ADD_CLIENTS_SUCCESS,
  payload: data
})

const addWorkerSuccess = data => ({
  type: ADD_WORKERS_SUCCESS,
  payload: data
})

const addOrderSuccess = data => ({
  type: ADD_ORDERS_SUCCESS,
  payload: data
})

const addClockSuccess = data => ({
  type: ADD_CLOCKS_SUCCESS,
  payload: data
})

const addCitySuccess = data => ({
  type: ADD_CITIES_SUCCESS,
  payload: data
})

const deleteClientSuccess = data => ({
  type: DELETE_CLIENTS_SUCCESS,
  payload: data
})

const deleteWorkerSuccess = data => ({
  type: DELETE_WORKERS_SUCCESS,
  payload: data
})

const deleteOrderSuccess = data => ({
  type: DELETE_ORDERS_SUCCESS,
  payload: data
})

const deleteClockSuccess = data => ({
  type: DELETE_CLOCKS_SUCCESS,
  payload: data
})

const deleteCitySuccess = data => ({
  type: DELETE_CITIES_SUCCESS,
  payload: data
})

const editUserSuccess = data => ({
  type: EDIT_CLIENTS_SUCCESS,
  payload: data
})

const editWorkerSuccess = data => ({
  type: EDIT_WORKERS_SUCCESS,
  payload: data
})

const editOrderSuccess = data => ({
  type: EDIT_ORDERS_SUCCESS,
  payload: data
})

const editClockSuccess = data => ({
  type: EDIT_CLOCKS_SUCCESS,
  payload: data
})

const editCitySuccess = data => ({
  type: EDIT_CITIES_SUCCESS,
  payload: data
})

const missAdminError = () => ({
  type: MISS_ADMIN_ERROR
})
