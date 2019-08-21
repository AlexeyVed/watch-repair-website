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
  EDIT_CUSTOMERS_SUCCESS
} from '../actions/types'

const initialState = {
  dataLoad: false,
  refactorModelInProcess: false,
  refactorModelError: null,
  redirectBackFromRefactor: false,
  showModal: false,
  wasDeleted: false,
  wasUpdated: false,
  wasCreated: false,
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
        data: {
          ...state.data,
          customers: action.payload,
          usersError: null
        }
      }

    case LOAD_CUSTOMERS_FAILURE:
      return {
        ...state,
        dataLoad: false,
        showModal: true,
        data: {
          ...state.data,
          customers: [],
          usersError: action.payload
        }
      }



    case ADD_CUSTOMERS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true,
        refactorModelError: null
      }

    case ADD_CUSTOMERS_SUCCESS:
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

    case ADD_CUSTOMERS_FAILURE:
      return {
        ...state,
        showModal: true,
        refactorModelError: action.payload,
        refactorModelInProcess: false
      }

    case EDIT_CUSTOMERS_STARTED:
      return {
        ...state,
        showModal: true,
        refactorModelInProcess: true,
        refactorModelError: null
      }

    case EDIT_CUSTOMERS_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
        wasUpdated: true,
        showModal: true,
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

    case EDIT_CUSTOMERS_FAILURE:
      return {
        ...state,
        refactorModelError: action.payload,
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
        refactorModelError: null,
        refactorModelInProcess: false,
        wasDeleted: true,
        showModal: true,
        data: {
          ...state.data,
          customers: state.data.customers.filter(el => el.id !== action.payload.id)
        }
      }

    case DELETE_CUSTOMERS_FAILURE:
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

export default customerReducer
