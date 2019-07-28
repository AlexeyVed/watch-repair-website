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
  LOAD_CLIENTS_ADMIN_STARTED,
  LOAD_CLIENTS_ADMIN_SUCCESS,
  LOAD_CLIENTS_ADMIN_FAILURE,
  LOAD_WORKERS_ADMIN_STARTED,
  LOAD_WORKERS_ADMIN_SUCCESS,
  LOAD_WORKERS_ADMIN_FAILURE,
  ADD_MODEL_STARTED,
  ADD_MODEL_SUCCESS,
  ADD_MODEL_FAILURE,
  DELETE_MODEL_STARTED,
  DELETE_MODEL_SUCCESS,
  DELETE_MODEL_FAILURE,
  EDIT_MODEL_STARTED,
  EDIT_MODEL_SUCCESS,
  EDIT_MODEL_FAILURE,
  REDIRECT_FROM_REFACTOR
} from './types.js'

import axios from 'axios'

export const loadClocksAdmin = () => {
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

export const loadCitiesAdmin = () => {
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

export const loadOrdersAdmin = () => {
  return (dispatch) => {
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

export const loadWorkersAdmin = () => {
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

export const loadClientsAdmin = () => {
  return (dispatch) => {
    dispatch(loadClientsStarted())
    axios
      .get(`http://localhost:3000/api/users/list`)
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
      .post(`http://localhost:3000/api/users/add`, values)
      .then(res => {
        console.log(res)
        dispatch(addModelSuccess(res))
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(addModelFailure(err))
      })
  }
}

export const addCityToDB = (values) => {
  return (dispatch) => {
    dispatch(addModelStarted())
    axios
      .post(`http://localhost:3000/api/cities/add`, values)
      .then(res => {
        dispatch(addModelSuccess())
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(addModelFailure(err))
      })
  }
}

export const addClockToDB = (values) => {
  return (dispatch) => {
    dispatch(addModelStarted())
    axios
      .post(`http://localhost:3000/api/clocks/add`, values)
      .then(res => {
        dispatch(addModelSuccess())
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(addModelFailure(err))
      })
  }
}

export const addWorkerToDB = (values) => {
  return (dispatch) => {
    dispatch(addModelStarted())
    axios
      .post(`http://localhost:3000/api/workers/add`, values)
      .then(res => {
        dispatch(addModelSuccess())
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(addModelFailure(err))
      })
  }
}

export const addOrderToDB = (values) => {
  values.timeRepair = Number(values.timeRepair)
  values.time = Number(values.time)
  values.masterID = Number(values.masterID)
  return (dispatch) => {
    dispatch(addModelStarted())
    axios
      .post(`http://localhost:3000/api/orders/addAdmin`, values)
      .then(res => {
        dispatch(addModelSuccess())
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(addModelFailure(err))
      })
  }
}

export const editUserIntoDB = (values) => {
  return (dispatch) => {
    dispatch(editModelStarted())
    axios
      .post(`http://localhost:3000/api/users/update`, values)
      .then(res => {
        dispatch(editModelSuccess())
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(editModelFailure(err))
      })
  }
}

export const editCityIntoDB = (values) => {
  return (dispatch) => {
    dispatch(editModelStarted())
    axios
      .post(`http://localhost:3000/api/cities/update`, values)
      .then(res => {
        dispatch(editModelSuccess())
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(editModelFailure(err))
      })
  }
}

export const editClockIntoDB = (values) => {
  return (dispatch) => {
    dispatch(editModelStarted())
    axios
      .post(`http://localhost:3000/api/clocks/update`, values)
      .then(res => {
        dispatch(editModelSuccess())
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(editModelFailure(err))
      })
  }
}

export const editOrderIntoDB = (values) => {
  values.timeRepair = Number(values.timeRepair)
  values.time = Number(values.time)
  values.id = Number(values.id)
  return (dispatch) => {
    dispatch(editModelStarted())
    axios
      .post(`http://localhost:3000/api/orders/update`, values)
      .then(res => {
        dispatch(editModelSuccess())
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(editModelFailure(err))
      })
  }
}

export const editWorkerIntoDB = (values) => {
  return (dispatch) => {
    dispatch(editModelStarted())
    axios
      .post(`http://localhost:3000/api/workers/update`, values)
      .then(res => {
        dispatch(editModelSuccess())
      })
      .then(() => {
        dispatch(redirectFromRefactor())
      })
      .catch(err => {
        dispatch(editModelFailure(err))
      })
  }
}

export const deleteClockFromDB = (id) => {
  return (dispatch) => {
    dispatch(deleteModelStarted())
    axios
      .post(`http://localhost:3000/api/clocks/delete`, { id })
      .then(res => {
        dispatch(deleteModelSuccess())
      })
      .catch(err => {
        dispatch(deleteModelFailure(err))
      })
  }
}

export const deleteOrderFromDB = (id) => {
  return (dispatch) => {
    dispatch(deleteModelStarted())
    axios
      .post(`http://localhost:3000/api/orders/delete`, { id })
      .then(res => {
        dispatch(deleteModelSuccess())
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
      .post(`http://localhost:3000/api/workers/delete`, { id })
      .then(res => {
        dispatch(deleteModelSuccess())
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
      .post(`http://localhost:3000/api/cities/delete`, { id })
      .then(res => {
        dispatch(deleteModelSuccess())
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
      .post(`http://localhost:3000/api/users/delete`, { id })
      .then(res => {
        dispatch(deleteModelSuccess())
      })
      .catch(err => {
        dispatch(deleteModelFailure(err))
      })
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
  type: LOAD_CLIENTS_ADMIN_STARTED
})

const loadClientsFailure = err => ({
  type: LOAD_CLIENTS_ADMIN_FAILURE,
  payload: err
})

const loadClientsSuccess = data => ({
  type: LOAD_CLIENTS_ADMIN_SUCCESS,
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

const editModelStarted = () => ({
  type: EDIT_MODEL_STARTED
})

const editModelFailure = () => ({
  type: EDIT_MODEL_FAILURE
})

const editModelSuccess = err => ({
  type: EDIT_MODEL_SUCCESS,
  payload: err
})

const redirectFromRefactor = () => ({
  type: REDIRECT_FROM_REFACTOR
})
