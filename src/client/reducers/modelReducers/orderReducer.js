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
  EDIT_ORDERS_SUCCESS,
  REDIRECT_FROM_REFACTOR,
  MISS_ERRORS,
  END_LOAD_DATA,
  GET_ORDER_FOR_EDIT_STARTED,
  GET_ORDER_FOR_EDIT_SUCCESS,
  GET_ORDER_FOR_EDIT_FAILURE
} from '../../actions/types.js'

const initialState = {
  data: [],
  orderForEdit: {
    id: null,
    date: null,
    time: null,
    customerId: null,
    clockId: null,
    cityId: null,
    masterId: null,
    customer: {
      id: null,
      name: null,
      email: null
    },
    clock: {
      id: null,
      typeClock: null,
      timeRepair: null
    },
    city: {
      id: null,
      city: null
    },
    master: {
      id: null,
      name: null,
      rating: null,
      cityId: null
    }
  },
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

    case GET_ORDER_FOR_EDIT_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case GET_ORDER_FOR_EDIT_SUCCESS:
      return {
        ...state,
        orderForEdit: action.payload,
        error: null,
        dataLoad: false
      }

    case GET_ORDER_FOR_EDIT_FAILURE:
      return {
        ...state,
        orderForEdit: {
          id: null,
          date: null,
          time: null,
          customerId: null,
          clockId: null,
          cityId: null,
          masterId: null,
          customer: {
            id: null,
            name: null,
            email: null
          },
          clock: {
            id: null,
            typeClock: null,
            timeRepair: null
          },
          city: {
            id: null,
            city: null
          },
          master: {
            id: null,
            name: null,
            rating: null,
            cityId: null
          }
        },
        showModal: true,
        dataLoad: false,
        error: action.payload
      }

    case ADD_ORDERS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case ADD_ORDERS_SUCCESS:
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

    case ADD_ORDERS_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case EDIT_ORDERS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case EDIT_ORDERS_SUCCESS:
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

    case EDIT_ORDERS_FAILURE:
      return {
        ...state,
        error: action.payload,
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
        data: state.data.filter(el => el.id !== +action.payload),
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case DELETE_ORDERS_FAILURE:
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
