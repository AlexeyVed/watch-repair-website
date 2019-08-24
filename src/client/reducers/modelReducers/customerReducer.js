import {
  LOAD_CUSTOMERS_STARTED,
  LOAD_CUSTOMERS_SUCCESS,
  LOAD_CUSTOMERS_FAILURE,
  ADD_CUSTOMERS_STARTED,
  ADD_CUSTOMERS_FAILURE,
  ADD_CUSTOMERS_SUCCESS,
  DELETE_CUSTOMERS_STARTED,
  DELETE_CUSTOMERS_FAILURE,
  DELETE_CUSTOMERS_SUCCESS,
  EDIT_CUSTOMERS_STARTED,
  EDIT_CUSTOMERS_FAILURE,
  EDIT_CUSTOMERS_SUCCESS,
  REDIRECT_FROM_REFACTOR,
  MISS_ERRORS
} from '../../actions/types.js'

const initialState = {
  data: [],
  error: null,
  redirectBackFromRefactor: false,
  refactorModelInProcess: false,
  showModal: false,
  message: null
}

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CUSTOMERS_STARTED:
      return {
        ...state
      }

    case LOAD_CUSTOMERS_SUCCESS:
      return {
        ...state,
        data: action.payload
      }

    case LOAD_CUSTOMERS_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload
      }

    case ADD_CUSTOMERS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case ADD_CUSTOMERS_SUCCESS:
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

    case ADD_CUSTOMERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case EDIT_CUSTOMERS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case EDIT_CUSTOMERS_SUCCESS:
      return {
        ...state,
        data: state.data.map(user => {
          if (user.id === Number(action.payload.id)) {
            action.payload.id = Number(action.payload.id)
            return action.payload
          }
          return user
        }),
        redirectBackFromRefactor: true,
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case EDIT_CUSTOMERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case DELETE_CUSTOMERS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case DELETE_CUSTOMERS_SUCCESS:
      return {
        ...state,
        data: state.data.filter(el => el.id !== action.payload.id),
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case DELETE_CUSTOMERS_FAILURE:
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

export default customerReducer
