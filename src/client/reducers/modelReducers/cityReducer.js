import {
  LOAD_CITIES_ADMIN_STARTED,
  LOAD_CITIES_ADMIN_SUCCESS,
  LOAD_CITIES_ADMIN_FAILURE,
  ADD_CITIES_STARTED,
  ADD_CITIES_FAILURE,
  ADD_CITIES_SUCCESS,
  DELETE_CITIES_STARTED,
  DELETE_CITIES_FAILURE,
  DELETE_CITIES_SUCCESS,
  EDIT_CITIES_STARTED,
  EDIT_CITIES_FAILURE,
  EDIT_CITIES_SUCCESS
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

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CITIES_ADMIN_STARTED:
      return {
        ...state,
        dataLoad: true
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
        dataLoad: false,
        showModal: true,
        data: {
          ...state.data,
          cities: [],
          citiesError: action.payload
        }
      }

    case ADD_CITIES_STARTED:
      return {
        ...state,
        refactorModelInProcess: true,
        refactorModelError: null
      }

    case ADD_CITIES_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
        wasCreated: true,
        showModal: true,
        data: {
          ...state.data,
          cities: [
            ...state.data.cities,
            action.payload
          ]
        }
      }

    case ADD_CITIES_FAILURE:
      return {
        ...state,
        showModal: true,
        refactorModelError: action.payload,
        refactorModelInProcess: false
      }

    case EDIT_CITIES_STARTED:
      return {
        ...state,
        showModal: true,
        refactorModelInProcess: true,
        refactorModelError: null
      }

    case EDIT_CITIES_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
        wasUpdated: true,
        showModal: true,
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

    case EDIT_CITIES_FAILURE:
      return {
        ...state,
        refactorModelError: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case DELETE_CITIES_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case DELETE_CITIES_SUCCESS:
      return {
        ...state,
        refactorModelError: null,
        refactorModelInProcess: false,
        wasDeleted: true,
        showModal: true,
        data: {
          ...state.data,
          cities: state.data.cities.filter(el => el.id !== action.payload.id)
        }
      }

    case DELETE_CITIES_FAILURE:
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

export default cityReducer
