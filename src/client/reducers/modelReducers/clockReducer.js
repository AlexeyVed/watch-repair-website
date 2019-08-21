import {
  LOAD_CLOCKS_ADMIN_STARTED,
  LOAD_CLOCKS_ADMIN_SUCCESS,
  LOAD_CLOCKS_ADMIN_FAILURE,
  ADD_CLOCKS_STARTED,
  ADD_CLOCKS_FAILURE,
  ADD_CLOCKS_SUCCESS,
  DELETE_CLOCKS_STARTED,
  DELETE_CLOCKS_FAILURE,
  DELETE_CLOCKS_SUCCESS,
  EDIT_CLOCKS_STARTED,
  EDIT_CLOCKS_FAILURE,
  EDIT_CLOCKS_SUCCESS
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

const clockReducer = (state = initialState, action) => {
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
        dataLoad: false,
        showModal: true,
        data: {
          ...state.data,
          clocks: [],
          clocksError: action.payload
        }
      }

    case ADD_CLOCKS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true,
        refactorModelError: null
      }

    case ADD_CLOCKS_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
        wasCreated: true,
        showModal: true,
        data: {
          ...state.data,
          clocks: [
            ...state.data.clocks,
            action.payload
          ]
        }
      }

    case ADD_CLOCKS_FAILURE:
      return {
        ...state,
        showModal: true,
        refactorModelError: action.payload,
        refactorModelInProcess: false
      }

    case EDIT_CLOCKS_STARTED:
      return {
        ...state,
        showModal: true,
        refactorModelInProcess: true,
        refactorModelError: null
      }

    case EDIT_CLOCKS_SUCCESS:
      return {
        ...state,
        refactorModelInProcess: false,
        refactorModelError: null,
        redirectBackFromRefactor: true,
        wasUpdated: true,
        showModal: true,
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

    case EDIT_CLOCKS_FAILURE:
      return {
        ...state,
        refactorModelError: action.payload,
        refactorModelInProcess: false,
        showModal: true
      }

    case DELETE_CLOCKS_STARTED:
      return {
        ...state,
        refactorModelInProcess: true
      }

    case DELETE_CLOCKS_SUCCESS:
      return {
        ...state,
        refactorModelError: null,
        refactorModelInProcess: false,
        wasDeleted: true,
        showModal: true,
        data: {
          ...state.data,
          clocks: state.data.clocks.filter(el => el.id !== action.payload.id)
        }
      }

    case DELETE_CLOCKS_FAILURE:
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

export default clockReducer
