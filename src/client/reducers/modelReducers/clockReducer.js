import {
  LOAD_CLOCKS_STARTED,
  LOAD_CLOCKS_SUCCESS,
  LOAD_CLOCKS_FAILURE,
  ADD_CLOCK_STARTED,
  ADD_CLOCK_FAILURE,
  ADD_CLOCK_SUCCESS,
  DELETE_CLOCK_STARTED,
  DELETE_CLOCK_FAILURE,
  DELETE_CLOCK_SUCCESS,
  EDIT_CLOCK_STARTED,
  EDIT_CLOCK_FAILURE,
  EDIT_CLOCK_SUCCESS,
  REDIRECT_FROM_REFACTOR,
  MISS_ERRORS,
  END_LOAD_DATA,
  GET_CLOCK_STARTED,
  GET_CLOCK_SUCCESS,
  GET_CLOCK_FAILURE
} from '../../actions/types.js'

const initialState = {
  error: null,
  data: [],
  redirectBackFromRefactor: false,
  refactorModelInProcess: false,
  showModal: false,
  message: null,
  dataLoad: false
}

const clockReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CLOCKS_STARTED:
      return {
        ...state,
        dataLoad: true
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
        showModal: true,
        error: action.payload
      }

    case GET_CLOCK_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case GET_CLOCK_SUCCESS:
      return {
        ...state,
        data: state.data.map(clock => {
          if (clock.id === action.payload.id) {
            return action.payload
          }
          return clock
        }),
        error: null,
        dataLoad: false
      }

    case GET_CLOCK_FAILURE:
      return {
        ...state,
        showModal: true,
        dataLoad: false,
        error: action.payload
      }

    case ADD_CLOCK_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case ADD_CLOCK_SUCCESS:
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

    case ADD_CLOCK_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case EDIT_CLOCK_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case EDIT_CLOCK_SUCCESS:
      return {
        ...state,
        data: state.data.map(clock => {
          if (clock.id === action.payload.id) {
            return action.payload
          }
          return clock
        }),
        redirectBackFromRefactor: true,
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case EDIT_CLOCK_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case DELETE_CLOCK_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case DELETE_CLOCK_SUCCESS:
      return {
        ...state,
        data: state.data.filter(el => el.id !== +action.payload),
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case DELETE_CLOCK_FAILURE:
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

export default clockReducer
