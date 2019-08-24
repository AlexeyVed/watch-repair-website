import {
  MISS_ERRORS,
  END_LOAD_DATA,
  MAKE_ORDER_STARTED,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILURE,
  MAKE_ORDER_WITH_MASTER_STARTED,
  MAKE_ORDER_WITH_MASTER_SUCCESS,
  MAKE_ORDER_WITH_MASTER_FAILURE,
  CHANGE_PAGE,
  SET_CHOOSE_WORKER,
  RETURN_HOME_PAGE,
  LOAD_CITIES_STARTED,
  LOAD_CLOCKS_STARTED,
  LOAD_CUSTOMERS_STARTED,
  LOAD_ORDERS_STARTED,
  LOAD_MASTERS_STARTED
} from '../actions/types.js'

const initialState = {
  forOrder: {
    freeWorkers: [],
    masterId: null,
    order: {}
  },
  isMakeOrder: false,
  error: null,
  chooseWorker: false,
  page: null,
  showModal: false,
  dataLoad: false
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
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
        forOrder: {
          ...state.forOrder,
          freeWorkers: action.payload.data,
          order: action.payload.values
        }
      }

    case MAKE_ORDER_FAILURE:
      return {
        ...state,
        isMakeOrder: false,
        showModal: true,
        error: action.payload
      }

    case RETURN_HOME_PAGE:
      return {
        ...state,
        chooseWorker: false,
        forOrder: {
          ...state.forOrder,
          freeWorkers: [],
          order: null
        }
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
        showModal: true,
        forOrder: {
          freWorkers: [],
          insertId: null,
          masterId: null
        }
      }

    case MAKE_ORDER_WITH_MASTER_FAILURE:
      return {
        ...state,
        isMakeOrder: false,
        chooseWorker: false,
        showModal: true,
        forOrder: {
          ...state.forOrder,
          masterId: null
        },
        error: action.payload
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
          masterId: action.payload
        }
      }

    case LOAD_CLOCKS_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case LOAD_CITIES_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case LOAD_CUSTOMERS_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case LOAD_MASTERS_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case LOAD_ORDERS_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case MISS_ERRORS:
      return {
        ...state,
        error: null,
        showModal: false
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

export default appReducer
