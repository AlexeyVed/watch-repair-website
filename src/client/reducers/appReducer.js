import {
  LOAD_CITIES_STARTED,
  LOAD_CITIES_SUCCESS,
  LOAD_CITIES_FAILURE,
  LOAD_CLOCKS_STARTED,
  LOAD_CLOCKS_SUCCESS,
  LOAD_CLOCKS_FAILURE,
  LOAD_WORKERS_STARTED,
  LOAD_WORKERS_SUCCESS,
  LOAD_WORKERS_FAILURE,
  MAKE_ORDER_STARTED,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILURE,
  MAKE_ORDER_WITH_MASTER_STARTED,
  MAKE_ORDER_WITH_MASTER_SUCCESS,
  MAKE_ORDER_WITH_MASTER_FAILURE,
  CHANGE_PAGE,
  SET_CHOOSE_WORKER
} from '../actions/types'

const initialState = {
  data: {
    clocks: [],
    cities: [],
    workers: [],
    loadClockError: null,
    loadCitiesError: null,
    loadWorkersError: null
  },
  forOrder: {
    freWorkers: [],
    insertId: null,
    masterID: null
  },
  dataLoad: false,
  isMakeOrder: false,
  makeOrderError: null,
  chooseWorker: false,
  page: null
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CLOCKS_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case LOAD_CLOCKS_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          clocks: action.payload,
          loadClockError: null
        }
      }

    case LOAD_CLOCKS_FAILURE:
      return {
        ...state,
        data: {
          ...state.data,
          clocks: [],
          loadClockError: action.payload
        }
      }

    case LOAD_CITIES_STARTED:
      return {
        ...state
      }

    case LOAD_CITIES_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          cities: action.payload,
          loadCitiesError: null
        }
      }

    case LOAD_CITIES_FAILURE:
      return {
        ...state,
        data: {
          ...state.data,
          cities: [],
          loadCitiesError: action.payload
        }
      }

    case LOAD_WORKERS_STARTED:
      return {
        ...state
      }

    case LOAD_WORKERS_SUCCESS:
      return {
        ...state,
        dataLoad: false,
        data: {
          ...state.data,
          workers: action.payload,
          loadWorkersError: null
        }
      }

    case LOAD_WORKERS_FAILURE:
      return {
        ...state,
        dataLoad: false,
        data: {
          ...state.data,
          workers: [],
          loadWorkersError: action.payload
        }
      }

    case MAKE_ORDER_STARTED:
      return {
        ...state,
        isMakeOrder: true
      }

    case MAKE_ORDER_SUCCESS:
      return {
        ...state,
        isMakeOrder: false,
        chooseWorker: true,
        forOrder: action.payload
      }

    case MAKE_ORDER_FAILURE:
      return {
        ...state,
        isMakeOrder: false,
        makeOrderError: action.payload
      }

    case MAKE_ORDER_WITH_MASTER_STARTED:
      return {
        ...state,
        isMakeOrder: true
      }

    case MAKE_ORDER_WITH_MASTER_SUCCESS:
      return {
        ...state,
        isMakeOrder: false,
        chooseWorker: false,
        forOrder: {
          freWorkers: [],
          insertId: null,
          masterID: null
        }
      }

    case MAKE_ORDER_WITH_MASTER_FAILURE:
      return {
        ...state,
        isMakeOrder: false,
        chooseWorker: false,
        makeOrderError: action.payload
      }

    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload
      }

    case SET_CHOOSE_WORKER:
      return {
        ...state,
        forOrder: {
          ...state.forOrder,
          masterID: action.payload
        }
      }

    default:
      return state
  }
}

export default appReducer
