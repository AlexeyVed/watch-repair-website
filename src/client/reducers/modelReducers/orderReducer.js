import {
  LOAD_ORDERS_STARTED,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_FAILURE,
  ADD_ORDER_STARTED,
  ADD_ORDER_FAILURE,
  ADD_ORDER_SUCCESS,
  DELETE_ORDER_STARTED,
  DELETE_ORDER_FAILURE,
  DELETE_ORDER_SUCCESS,
  EDIT_ORDER_STARTED,
  EDIT_ORDER_FAILURE,
  EDIT_ORDER_SUCCESS,
  REDIRECT_FROM_REFACTOR,
  MISS_ERRORS,
  END_LOAD_DATA,
  GET_ORDER_STARTED,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILURE
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

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ORDERS_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case LOAD_ORDERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }

    case LOAD_ORDERS_FAILURE:
      return {
        ...state,
        data: [],
        showModal: true,
        error: action.payload
      }

    case GET_ORDER_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case GET_ORDER_SUCCESS:
      return {
        ...state,
        data: state.data.map(order => {
          if (order.id === action.payload.id) {
            return action.payload
          }
          return order
        }),
        error: null,
        dataLoad: false
      }

    case GET_ORDER_FAILURE:
      return {
        ...state,
        showModal: true,
        dataLoad: false,
        error: action.payload
      }

    case ADD_ORDER_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case ADD_ORDER_SUCCESS:
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

    case ADD_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case EDIT_ORDER_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case EDIT_ORDER_SUCCESS:
      return {
        ...state,
        data: state.data.map(order => {
          if (order.id === Number(action.payload.id)) {
            action.payload.masterID = Number(action.payload.masterID)
            return action.payload
          }
          return order
        }),
        redirectBackFromRefactor: true,
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case EDIT_ORDER_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case DELETE_ORDER_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        data: state.data.filter(el => el.id !== +action.payload),
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case DELETE_ORDER_FAILURE:
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

export default orderReducer
