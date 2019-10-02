import {
  LOAD_CUSTOMERS_STARTED,
  LOAD_CUSTOMERS_SUCCESS,
  LOAD_CUSTOMERS_FAILURE,
  ADD_CUSTOMER_STARTED,
  ADD_CUSTOMER_FAILURE,
  ADD_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_STARTED,
  DELETE_CUSTOMER_FAILURE,
  DELETE_CUSTOMER_SUCCESS,
  EDIT_CUSTOMER_STARTED,
  EDIT_CUSTOMER_FAILURE,
  EDIT_CUSTOMER_SUCCESS,
  REDIRECT_FROM_REFACTOR,
  MISS_ERRORS,
  END_LOAD_DATA,
  GET_CUSTOMER_STARTED,
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_FAILURE
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

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CUSTOMERS_STARTED:
      return {
        ...state,
        dataLoad: true
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
        showModal: true,
        error: action.payload
      }

    case GET_CUSTOMER_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case GET_CUSTOMER_SUCCESS:
      return {
        ...state,
        data: state.data.map(user => {
          if (user.id === action.payload.id) {
            return action.payload
          }
          return user
        }),
        error: null,
        dataLoad: false
      }

    case GET_CUSTOMER_FAILURE:
      return {
        ...state,
        showModal: true,
        dataLoad: false,
        error: action.payload
      }

    case ADD_CUSTOMER_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case ADD_CUSTOMER_SUCCESS:
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

    case ADD_CUSTOMER_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case EDIT_CUSTOMER_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case EDIT_CUSTOMER_SUCCESS:
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

    case EDIT_CUSTOMER_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case DELETE_CUSTOMER_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        data: state.data.filter(el => el.id !== +action.payload),
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case DELETE_CUSTOMER_FAILURE:
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

export default customerReducer
