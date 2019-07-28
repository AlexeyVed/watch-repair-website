import {
  LOAD_DATA_FAILURE,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_STARTED,
  ADD_MODEL_STARTED,
  ADD_MODEL_SUCCESS,
  ADD_MODEL_FAILURE,
  DELETE_MODEL_STARTED,
  DELETE_MODEL_SUCCESS,
  DELETE_MODEL_FAILURE,
  EDIT_MODEL_STARTED,
  EDIT_MODEL_SUCCESS,
  EDIT_MODEL_FAILURE
} from './types.js'

import axios from 'axios'

export const loadDataAdmin = () => {
  return (dispatch) => {
    dispatch(loadDataStarted())
    axios
      .get(`http://localhost:3000/api/data/listAdmin`)
      .then(res => {
        dispatch(loadDataSuccess(res.data))
      })
      .catch(err => {
        dispatch(loadDataFailure(err.response.data))
      })
  }
}

export const addUserToDB = (values) => {
  return (dispatch) => {
    dispatch(addModelStarted())
    axios
      .post(`http://localhost:3000/api/users/add`, values)
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

export const addCityToDB = (values) => {
  return (dispatch) => {
    dispatch(addModelStarted())
    axios
      .post(`http://localhost:3000/api/cities/add`, values)
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

export const addClockToDB = (values) => {
  return (dispatch) => {
    dispatch(addModelStarted())
    axios
      .post(`http://localhost:3000/api/clocks/add`, values)
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

export const addWorkerToDB = (values) => {
  return (dispatch) => {
    dispatch(addModelStarted())
    axios
      .post(`http://localhost:3000/api/workers/add`, values)
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
      .then(res => {
        dispatch(loadDataAdmin())
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
      .then(res => {
        dispatch(loadDataAdmin())
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
      .then(res => {
        dispatch(loadDataAdmin())
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
      .then(res => {
        dispatch(loadDataAdmin())
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
      .then(res => {
        dispatch(loadDataAdmin())
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
      .then(res => {
        dispatch(loadDataAdmin())
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
      .then(res => {
        dispatch(loadDataAdmin())
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
      .post(`http://localhost:3000/api/workers/delete`, { id })
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
      .post(`http://localhost:3000/api/cities/delete`, { id })
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
      .post(`http://localhost:3000/api/users/delete`, { id })
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
