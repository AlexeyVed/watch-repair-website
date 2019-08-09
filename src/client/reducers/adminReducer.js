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
  LOAD_CUSTOMERS_ADMIN_STARTED,
  LOAD_CUSTOMERS_ADMIN_SUCCESS,
  LOAD_CUSTOMERS_ADMIN_FAILURE,
  LOAD_WORKERS_ADMIN_STARTED,
  LOAD_WORKERS_ADMIN_SUCCESS,
  LOAD_WORKERS_ADMIN_FAILURE,
  ADD_MODEL_STARTED,
  ADD_MODEL_FAILURE,
  ADD_CITIES_SUCCESS,
  ADD_CLIENTS_SUCCESS,
  ADD_CLOCKS_SUCCESS,
  ADD_ORDERS_SUCCESS,
  ADD_WORKERS_SUCCESS,
  DELETE_MODEL_STARTED,
  DELETE_MODEL_FAILURE,
  DELETE_CITIES_SUCCESS,
  DELETE_CLIENTS_SUCCESS,
  DELETE_CLOCKS_SUCCESS,
  DELETE_ORDERS_SUCCESS,
  DELETE_WORKERS_SUCCESS,
  EDIT_MODEL_STARTED,
  EDIT_MODEL_FAILURE,
  EDIT_CITIES_SUCCESS,
  EDIT_CLIENTS_SUCCESS,
  EDIT_CLOCKS_SUCCESS,
  EDIT_ORDERS_SUCCESS,
  EDIT_WORKERS_SUCCESS,
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
    customers: [],
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
        dataLoad: false,
        data: {
          ...state.data,
          clocks: action.payload,
          clocksError: null
        }
      }

    case LOAD_CLOCKS_ADMIN_FAILURE:
      return {
        ...state,
        dataLoad: false,
        data: {
          ...state.data,
          clocks: [],
          clocksError: action.payload
        }
      }

    case LOAD_CITIES_ADMIN_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case LOAD_CITIES_ADMIN_SUCCESS:
      return {
        ...state,
        dataLoad: false,
        data: {
          ...state.data,
          cities: action.payload,
          citiesError: null
        }
      }

    case LOAD_CITIES_ADMIN_FAILURE:
      return {
        ...state,
        dataLoad: false,
        data: {
          ...state.data,
          cities: [],
          citiesError: action.payload
        }
      }

    case LOAD_ORDERS_ADMIN_STARTED:
      return {
        ...state,
        dataLoad: true
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

    case LOAD_CUSTOMERS_ADMIN_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case LOAD_CUSTOMERS_ADMIN_SUCCESS:
      return {
        ...state,
        dataLoad: false,
        data: {
          ...state.data,
          customers: action.payload,
          usersError: null
        }
      }

    case LOAD_CUSTOMERS_ADMIN_FAILURE:
      return {
        ...state,
        dataLoad: false,
        data: {
          ...state.data,
          customers: [],
          usersError: action.payload
        }
      }

    case LOAD_WORKERS_ADMIN_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case LOAD_WORKERS_ADMIN_SUCCESS:
      return {
        ...state,
        dataLoad: false,
        data: {
          ...state.data,
          workers: action.payload,
          workersError: null
        }
      }

    case LOAD_WORKERS_ADMIN_FAILURE:
      return {
        ...state,
        dataLoad: false,
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

    case ADD_CLIENTS_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
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
        data: {
          ...state.data,
          orders: [
            ...state.data.orders,
            action.payload
          ]
        }
      }

    case ADD_CITIES_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
        data: {
          ...state.data,
          cities: [
            ...state.data.cities,
            action.payload
          ]
        }
      }

    case ADD_CLOCKS_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
        data: {
          ...state.data,
          clocks: [
            ...state.data.clocks,
            action.payload
          ]
        }
      }

    case ADD_WORKERS_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
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

    case EDIT_CITIES_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
        data: {
          ...state.data,
          cities: state.data.cities.map(city => {
            if (city.id === Number(action.payload.id)) {
              action.payload.id = Number(action.payload.id)
              return action.payload
            }
            return city
          })
        }
      }

    case EDIT_CLOCKS_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
        data: {
          ...state.data,
          clocks: state.data.clocks.map(clock => {
            if (clock.id === Number(action.payload.id)) {
              action.payload.id = Number(action.payload.id)
              action.payload.timeRepair = Number(action.payload.timeRepair)
              return action.payload
            }
            return clock
          })
        }
      }

    case EDIT_CLIENTS_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
        data: {
          ...state.data,
          customers: state.data.customers.map(user => {
            if (user.id === Number(action.payload.id)) {
              action.payload.id = Number(action.payload.id)
              return action.payload
            }
            return user
          })
        }
      }

    case EDIT_ORDERS_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
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

    case EDIT_WORKERS_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
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

    case DELETE_CITIES_SUCCESS:
      return {
        ...state,
        refactorModelError: null,
        refactorModelInProcess: false,
        data: {
          ...state.data,
          cities: state.data.cities.filter(el => el.id !== action.payload.id)
        }
      }

    case DELETE_CLOCKS_SUCCESS:
      return {
        ...state,
        refactorModelError: null,
        refactorModelInProcess: false,
        data: {
          ...state.data,
          clocks: state.data.clocks.filter(el => el.id !== action.payload.id)
        }
      }

    case DELETE_CLIENTS_SUCCESS:
      return {
        ...state,
        refactorModelError: null,
        refactorModelInProcess: false,
        data: {
          ...state.data,
          customers: state.data.customers.filter(el => el.id !== action.payload.id)
        }
      }

    case DELETE_WORKERS_SUCCESS:
      return {
        ...state,
        refactorModelError: null,
        refactorModelInProcess: false,
        data: {
          ...state.data,
          workers: state.data.workers.filter(el => el.id !== action.payload.id)
        }
      }

    case DELETE_ORDERS_SUCCESS:
      return {
        ...state,
        refactorModelError: null,
        refactorModelInProcess: false,
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
