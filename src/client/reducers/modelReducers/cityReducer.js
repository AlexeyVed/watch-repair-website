import {
  LOAD_CITIES_STARTED,
  LOAD_CITIES_SUCCESS,
  LOAD_CITIES_FAILURE,
  ADD_CITY_STARTED,
  ADD_CITY_FAILURE,
  ADD_CITY_SUCCESS,
  DELETE_CITY_STARTED,
  DELETE_CITY_FAILURE,
  DELETE_CITY_SUCCESS,
  EDIT_CITY_STARTED,
  EDIT_CITY_FAILURE,
  EDIT_CITY_SUCCESS,
  REDIRECT_FROM_REFACTOR,
  MISS_ERRORS,
  END_LOAD_DATA,
  GET_CITY_STARTED,
  GET_CITY_SUCCESS,
  GET_CITY_FAILURE
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

const cityReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CITIES_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case LOAD_CITIES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }

    case LOAD_CITIES_FAILURE:
      return {
        ...state,
        data: [],
        showModal: true,
        error: action.payload
      }

    case GET_CITY_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case GET_CITY_SUCCESS:
      return {
        ...state,
        data: state.data.map(city => {
          if (city.id === action.payload.id) {
            return action.payload
          }
          return city
        }),
        error: null,
        dataLoad: false
      }

    case GET_CITY_FAILURE:
      return {
        ...state,
        showModal: true,
        dataLoad: false,
        error: action.payload
      }

    case ADD_CITY_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case ADD_CITY_SUCCESS:
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

    case ADD_CITY_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case EDIT_CITY_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case EDIT_CITY_SUCCESS:
      return {
        ...state,
        data: state.data.map(city => {
          if (city.id === action.payload.id) {
            return action.payload
          }
          return city
        }),
        redirectBackFromRefactor: true,
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case EDIT_CITY_FAILURE:
      return {
        ...state,
        error: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case DELETE_CITY_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case DELETE_CITY_SUCCESS:
      return {
        ...state,
        data: state.data.filter(el => el.id !== +action.payload),
        refactorModelInProcess: false,
        showModal: true,
        message: action.message
      }

    case DELETE_CITY_FAILURE:
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

export default cityReducer
