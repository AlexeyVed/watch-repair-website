import {
  LOAD_MASTERS_STARTED,
  LOAD_MASTERS_SUCCESS,
  LOAD_MASTERS_FAILURE,
  ADD_MASTERS_STARTED,
  ADD_MASTERS_FAILURE,
  ADD_MASTERS_SUCCESS,
  DELETE_MASTERS_STARTED,
  DELETE_MASTERS_FAILURE,
  DELETE_MASTERS_SUCCESS,
  EDIT_MASTERS_STARTED,
  EDIT_MASTERS_FAILURE,
  EDIT_MASTERS_SUCCESS,
  REDIRECT_FROM_REFACTOR,
  MISS_ERRORS,
  END_LOAD_DATA
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

    case ADD_MASTERS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case ADD_MASTERS_SUCCESS:
      return {
        ...state,
        data: [
          ...state.data,
          action.payload
        ],
        redirectBackFromRefactor: true,
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case ADD_MASTERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case EDIT_MASTERS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case EDIT_MASTERS_SUCCESS:
      return {
        ...state,
        data: state.data.map(worker => {
          if (worker.id === Number(action.payload.id)) {
            action.payload.id = Number(action.payload.id)
            action.payload.rating = Number(action.payload.rating)
            return action.payload
          }
          return worker
        }),
        redirectBackFromRefactor: true,
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case EDIT_MASTERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case DELETE_MASTERS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case DELETE_MASTERS_SUCCESS:
      return {
        ...state,
        data: state.data.filter(el => el.id !== +action.payload),
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case DELETE_MASTERS_FAILURE:
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
