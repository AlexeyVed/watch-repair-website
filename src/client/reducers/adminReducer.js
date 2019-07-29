import {
  LOAD_CLOCKS_ADMIN_STARTED,
  LOAD_CLOCKS_ADMIN_SUCCESS,
  LOAD_CLOCKS_ADMIN_FAILURE,
  LOAD_CITIES_ADMIN_STARTED,
  LOAD_CITIES_ADMIN_SUCCESS,
  LOAD_CITIES_ADMIN_FAILURE,
  LOAD_ORDERS_ADMIN_STARTED,
  LOAD_ORDERS_ADMIN_SUCCESS,
  LOAD_ORDERS_ADMIN_FAILURE,
  LOAD_CLIENTS_ADMIN_STARTED,
  LOAD_CLIENTS_ADMIN_SUCCESS,
  LOAD_CLIENTS_ADMIN_FAILURE,
  LOAD_WORKERS_ADMIN_STARTED,
  LOAD_WORKERS_ADMIN_SUCCESS,
  LOAD_WORKERS_ADMIN_FAILURE,
  ADD_MODEL_STARTED,
  ADD_MODEL_SUCCESS,
  ADD_MODEL_FAILURE,
  ADD_CITIES_TO_STATE,
  ADD_CLIENTS_TO_STATE,
  ADD_CLOCKS_TO_STATE,
  ADD_ORDERS_TO_STATE,
  ADD_WORKERS_TO_STATE,
  DELETE_MODEL_STARTED,
  DELETE_MODEL_SUCCESS,
  DELETE_MODEL_FAILURE,
  DELETE_CITIES_FROM_STATE,
  DELETE_CLIENTS_FROM_STATE,
  DELETE_CLOCKS_FROM_STATE,
  DELETE_ORDERS_FROM_STATE,
  DELETE_WORKERS_FROM_STATE,
  EDIT_MODEL_STARTED,
  EDIT_MODEL_SUCCESS,
  EDIT_MODEL_FAILURE,
  REDIRECT_FROM_REFACTOR
} from '../actions/types'

const initialState = {
  dataLoad: false,
  refactorModelInProcess: false,
  refactorModelError: null,
  redirectBackFromRefactor: false,
  data: {
    clocks: [],
    cities: [],
    users: [],
    workers: [],
    orders: [],
    clocksError: null,
    citiesError: null,
    usersError: null,
    workersError: null,
    ordersError: null
  }
}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CLOCKS_ADMIN_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case LOAD_CLOCKS_ADMIN_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          clocks: action.payload,
          clocksError: null
        }
      }

    case LOAD_CLOCKS_ADMIN_FAILURE:
      return {
        ...state,
        data: {
          ...state.data,
          clocks: [],
          clocksError: action.payload
        }
      }

    case LOAD_CITIES_ADMIN_STARTED:
      return {
        ...state
      }

    case LOAD_CITIES_ADMIN_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          cities: action.payload,
          citiesError: null
        }
      }

    case LOAD_CITIES_ADMIN_FAILURE:
      return {
        ...state,
        data: {
          ...state.data,
          cities: [],
          citiesError: action.payload
        }
      }

    case LOAD_ORDERS_ADMIN_STARTED:
      return {
        ...state
      }

    case LOAD_ORDERS_ADMIN_SUCCESS:
      return {
        ...state,
        dataLoad: false,
        data: {
          ...state.data,
          orders: action.payload,
          ordersError: null
        }
      }

    case LOAD_ORDERS_ADMIN_FAILURE:
      return {
        ...state,
        dataLoad: false,
        data: {
          ...state.data,
          orders: [],
          ordersError: action.payload
        }
      }

    case LOAD_CLIENTS_ADMIN_STARTED:
      return {
        ...state
      }

    case LOAD_CLIENTS_ADMIN_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          users: action.payload,
          usersError: null
        }
      }

    case LOAD_CLIENTS_ADMIN_FAILURE:
      return {
        ...state,
        dataLoad: false,
        data: {
          ...state.data,
          users: [],
          usersError: action.payload
        }
      }

    case LOAD_WORKERS_ADMIN_STARTED:
      return {
        ...state
      }

    case LOAD_WORKERS_ADMIN_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          workers: action.payload,
          workersError: null
        }
      }

    case LOAD_WORKERS_ADMIN_FAILURE:
      return {
        ...state,
        data: {
          ...state.data,
          workers: [],
          workersError: action.payload
        }
      }

    case ADD_MODEL_STARTED:
      return {
        ...state,
        refactorModelInProcess: true,
        refactorModelError: null
      }

    case ADD_MODEL_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true
      }

    case ADD_CLIENTS_TO_STATE:
      return {
        ...state,
        data: {
          ...state.data,
          users: [
            ...state.data.users,
            action.payload
          ]
        }
      }

    case ADD_ORDERS_TO_STATE:
      return {
        ...state,
        data: {
          ...state.data,
          orders: [
            ...state.data.orders,
            action.payload
          ]
        }
      }

    case ADD_CITIES_TO_STATE:
      return {
        ...state,
        data: {
          ...state.data,
          cities: [
            ...state.data.cities,
            action.payload
          ]
        }
      }

    case ADD_CLOCKS_TO_STATE:
      return {
        ...state,
        data: {
          ...state.data,
          clocks: [
            ...state.data.clocks,
            action.payload
          ]
        }
      }

    case ADD_WORKERS_TO_STATE:
      return {
        ...state,
        data: {
          ...state.data,
          workers: [
            ...state.data.workers,
            action.payload
          ]
        }
      }

    case ADD_MODEL_FAILURE:
      return {
        ...state,
        refactorModelError: action.payload,
        refactorModelInProcess: false
      }

    case EDIT_MODEL_STARTED:
      return {
        ...state,
        refactorModelInProcess: true,
        refactorModelError: null
      }

    case EDIT_MODEL_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true
      }

    case EDIT_MODEL_FAILURE:
      return {
        ...state,
        refactorModelError: action.payload,
        refactorModelInProcess: false
      }

    case DELETE_MODEL_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case DELETE_MODEL_SUCCESS:
      return {
        ...state,
        refactorModelError: null,
        refactorModelInProcess: false
      }

    case DELETE_CITIES_FROM_STATE:
      return {
        ...state,
        data: {
          ...state.data,
          cities: state.data.cities.filter(el => el.id !== action.payload.id)
        }
      }

    case DELETE_CLOCKS_FROM_STATE:
      return {
        ...state,
        data: {
          ...state.data,
          clocks: state.data.clocks.filter(el => el.id !== action.payload.id)
        }
      }

    case DELETE_CLIENTS_FROM_STATE:
      return {
        ...state,
        data: {
          ...state.data,
          users: state.data.users.filter(el => el.idlogin !== action.payload.id)
        }
      }

    case DELETE_WORKERS_FROM_STATE:
      return {
        ...state,
        data: {
          ...state.data,
          workers: state.data.workers.filter(el => el.idworker !== action.payload.id)
        }
      }

    case DELETE_ORDERS_FROM_STATE:
      return {
        ...state,
        data: {
          ...state.data,
          orders: state.data.orders.filter(el => el.id !== action.payload.id)
        }
      }

    case DELETE_MODEL_FAILURE:
      return {
        ...state,
        refactorModelError: action.payload,
        refactorModelInProcess: false
      }

    case REDIRECT_FROM_REFACTOR:
      return {
        ...state,
        redirectBackFromRefactor: false
      }

    default:
      return state
  }
}

export default adminReducer
