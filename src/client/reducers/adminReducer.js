import {
  LOAD_DATA_STARTED,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE,
  ADD_MODEL_STARTED,
  ADD_MODEL_SUCCESS,
  ADD_MODEL_FAILURE,
  DELETE_MODEL_STARTED,
  DELETE_MODEL_SUCCESS,
  DELETE_MODEL_FAILURE,
  EDIT_MODEL_STARTED,
  EDIT_MODEL_SUCCESS,
  EDIT_MODEL_FAILURE
} from '../actions/types'

const initialState = {
  dataLoad: false,
  dataError: null,
  refactorModelInProcess: false,
  refactorModelError: null,
  redirectBackFromRefactor: false,
  data: {
    clocks: [],
    cities: [],
    users: [],
    workers: []
  }
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case LOAD_DATA_SUCCESS:
      return {
        ...state,
        dataLoad: false,
        redirectBackFromRefactor: false,
        data: {
          ...state.data,
          cities: action.payload[0],
          clocks: action.payload[1],
          users: action.payload[2],
          workers: action.payload[3]
        }
      }

    case LOAD_DATA_FAILURE:
      return {
        ...state,
        dataLoad: false,
        dataError: action.payload
      }

    case ADD_MODEL_STARTED:
      return {
        ...state,
        refactorModelInProcess: true,
        refactorModelError: null
      }

    case ADD_MODEL_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true
      }

    case ADD_MODEL_FAILURE:
      return {
        ...state,
        refactorModelError: action.payload,
        refactorModelInProcess: false
      }

    case DELETE_MODEL_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case DELETE_MODEL_SUCCESS:
      return {
        ...state,
        refactorModelError: null,
        refactorModelInProcess: false
      }

    case DELETE_MODEL_FAILURE:
      return {
        ...state,
        refactorModelError: action.payload,
        refactorModelInProcess: false
      }

    default:
      return state
  }
  return state
}

export default adminReducer
