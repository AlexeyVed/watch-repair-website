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
  EDIT_MASTERS_SUCCESS
} from '../../actions/types.js'

const initialState = {
  data: [],
  error: null
}

const masterReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_MASTERS_STARTED:
      return {
        ...state
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
        error: action.payload
      }

    case ADD_MASTERS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true,
        refactorModelError: null
      }

    case ADD_MASTERS_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
        wasCreated: true,
        showModal: true,
        data: {
          ...state.data,
          workers: [
            ...state.data.workers,
            action.payload
          ]
        }
      }

    case ADD_MASTERS_FAILURE:
      return {
        ...state,
        showModal: true,
        refactorModelError: action.payload,
        refactorModelInProcess: false
      }

    case EDIT_MASTERS_STARTED:
      return {
        ...state,
        showModal: true,
        refactorModelInProcess: true,
        refactorModelError: null
      }

    case EDIT_MASTERS_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
        wasUpdated: true,
        showModal: true,
        data: {
          ...state.data,
          workers: state.data.workers.map(worker => {
            if (worker.id === Number(action.payload.id)) {
              action.payload.id = Number(action.payload.id)
              action.payload.rating = Number(action.payload.rating)
              return action.payload
            }
            return worker
          })
        }
      }

    case EDIT_MASTERS_FAILURE:
      return {
        ...state,
        refactorModelError: action.payload,
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
        refactorModelError: null,
        refactorModelInProcess: false,
        wasDeleted: true,
        showModal: true,
        data: {
          ...state.data,
          workers: state.data.workers.filter(el => el.id !== action.payload.id)
        }
      }

    case DELETE_MASTERS_FAILURE:
      return {
        ...state,
        refactorModelError: action.payload,
        showModal: true,
        refactorModelInProcess: false
      }

    default:
      return state
  }
}

export default masterReducer
