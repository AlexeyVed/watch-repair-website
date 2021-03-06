import {
  LOAD_MASTERS_STARTED,
  LOAD_MASTERS_SUCCESS,
  LOAD_MASTERS_FAILURE,
  ADD_MASTER_STARTED,
  ADD_MASTER_FAILURE,
  ADD_MASTER_SUCCESS,
  DELETE_MASTER_STARTED,
  DELETE_MASTER_FAILURE,
  DELETE_MASTER_SUCCESS,
  EDIT_MASTER_STARTED,
  EDIT_MASTER_FAILURE,
  EDIT_MASTER_SUCCESS,
  REDIRECT_FROM_REFACTOR,
  MISS_ERRORS,
  END_LOAD_DATA,
  GET_MASTER_STARTED,
  GET_MASTER_SUCCESS,
  GET_MASTER_FAILURE
} from '../../actions/types.js'

const initialState = {
  data: [],
  error: null,
  redirectBackFromRefactor: false,
  refactorModelInProcess: false,
  showModal: false,
  message: null,
  dataLoad: false
}

const masterReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MASTERS_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case LOAD_MASTERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }

    case LOAD_MASTERS_FAILURE:
      return {
        ...state,
        data: [],
        showModal: true,
        error: action.payload
      }

    case GET_MASTER_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case GET_MASTER_SUCCESS:
      return {
        ...state,
        data: state.data.map(worker => {
          if (worker.id === action.payload.id) {
            return action.payload
          }
          return worker
        }),
        error: null,
        dataLoad: false
      }

    case GET_MASTER_FAILURE:
      return {
        ...state,
        showModal: true,
        dataLoad: false,
        error: action.payload
      }

    case ADD_MASTER_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case ADD_MASTER_SUCCESS:
      return {
        ...state,
        data: state.data.concat(action.payload),
        redirectBackFromRefactor: true,
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case ADD_MASTER_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case EDIT_MASTER_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case EDIT_MASTER_SUCCESS:
      return {
        ...state,
        data: state.data.map(worker => {
          if (worker.id === action.payload.id) {
            return action.payload
          }
          return worker
        }),
        redirectBackFromRefactor: true,
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case EDIT_MASTER_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case DELETE_MASTER_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case DELETE_MASTER_SUCCESS:
      return {
        ...state,
        data: state.data.filter(el => el.id !== +action.payload),
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case DELETE_MASTER_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case REDIRECT_FROM_REFACTOR:
      return {
        ...state,
        redirectBackFromRefactor: false
      }

    case MISS_ERRORS:
      return {
        ...state,
        error: null,
        showModal: false,
        message: null
      }

    case END_LOAD_DATA:
      return {
        ...state,
        dataLoad: false
      }
    default:
      return state
  }
}

export default masterReducer
