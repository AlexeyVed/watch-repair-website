import {
  LOAD_CLOCKS_STARTED,
  LOAD_CLOCKS_SUCCESS,
  LOAD_CLOCKS_FAILURE,
  ADD_CLOCKS_STARTED,
  ADD_CLOCKS_FAILURE,
  ADD_CLOCKS_SUCCESS,
  DELETE_CLOCKS_STARTED,
  DELETE_CLOCKS_FAILURE,
  DELETE_CLOCKS_SUCCESS,
  EDIT_CLOCKS_STARTED,
  EDIT_CLOCKS_FAILURE,
  EDIT_CLOCKS_SUCCESS,
  REDIRECT_FROM_REFACTOR,
  MISS_ERRORS
} from '../../actions/types.js'

const initialState = {
  error: null,
  data: [],
  redirectBackFromRefactor: false,
  refactorModelInProcess: false,
  showModal: false,
  message: null
}

const clockReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CLOCKS_STARTED:
      return {
        ...state
      }

    case LOAD_CLOCKS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }

    case LOAD_CLOCKS_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload
      }

    case ADD_CLOCKS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case ADD_CLOCKS_SUCCESS:
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

    case ADD_CLOCKS_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case EDIT_CLOCKS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case EDIT_CLOCKS_SUCCESS:
      return {
        ...state,
        data: state.data.map(clock => {
          if (clock.id === Number(action.payload.id)) {
            action.payload.id = Number(action.payload.id)
            action.payload.timeRepair = Number(action.payload.timeRepair)
            return action.payload
          }
          return clock
        }),
        redirectBackFromRefactor: true,
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case EDIT_CLOCKS_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case DELETE_CLOCKS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case DELETE_CLOCKS_SUCCESS:
      return {
        ...state,
        data: state.data.filter(el => el.id !== +action.payload),
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case DELETE_CLOCKS_FAILURE:
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

    default:
      return state
  }
}

export default clockReducer
