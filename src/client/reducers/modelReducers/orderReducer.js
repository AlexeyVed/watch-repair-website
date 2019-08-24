import {
  LOAD_ORDERS_STARTED,
  LOAD_ORDERS_SUCCESS,
  LOAD_ORDERS_FAILURE,
  ADD_ORDERS_STARTED,
  ADD_ORDERS_FAILURE,
  ADD_ORDERS_SUCCESS,
  DELETE_ORDERS_STARTED,
  DELETE_ORDERS_FAILURE,
  DELETE_ORDERS_SUCCESS,
  EDIT_ORDERS_STARTED,
  EDIT_ORDERS_FAILURE,
  EDIT_ORDERS_SUCCESS
} from '../../actions/types.js'

const initialState = {
  data: [],
  error: null
}

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ORDERS_STARTED:
      return {
        ...state
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
        error: action.payload
      }

    case ADD_ORDERS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true,
        refactorModelError: null
      }

    case ADD_ORDERS_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
        wasCreated: true,
        showModal: true,
        data: {
          ...state.data,
          customers: [
            ...state.data.customers,
            action.payload
          ]
        }
      }

    case ADD_ORDERS_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
        wasCreated: true,
        showModal: true,
        data: {
          ...state.data,
          orders: [
            ...state.data.orders,
            action.payload
          ]
        }
      }

    case ADD_ORDERS_FAILURE:
      return {
        ...state,
        showModal: true,
        refactorModelError: action.payload,
        refactorModelInProcess: false
      }

    case EDIT_ORDERS_STARTED:
      return {
        ...state,
        showModal: true,
        refactorModelInProcess: true,
        refactorModelError: null
      }

    case EDIT_ORDERS_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
        wasUpdated: true,
        showModal: true,
        data: {
          ...state.data,
          orders: state.data.orders.map(order => {
            if (order.id === Number(action.payload.id)) {
              action.payload.masterID = Number(action.payload.masterID)
              return action.payload
            }
            return order
          })
        }
      }

    case EDIT_ORDERS_FAILURE:
      return {
        ...state,
        refactorModelError: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case DELETE_ORDERS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case DELETE_ORDERS_SUCCESS:
      return {
        ...state,
        refactorModelError: null,
        refactorModelInProcess: false,
        wasDeleted: true,
        showModal: true,
        data: {
          ...state.data,
          orders: state.data.orders.filter(el => el.id !== action.payload.id)
        }
      }

    case DELETE_ORDERS_FAILURE:
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

export default orderReducer
