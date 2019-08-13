import {
  MAKE_ORDER_STARTED,
  MAKE_ORDER_SUCCESS,
  MAKE_ORDER_FAILURE,
  MAKE_ORDER_WITH_MASTER_STARTED,
  MAKE_ORDER_WITH_MASTER_SUCCESS,
  MAKE_ORDER_WITH_MASTER_FAILURE,
  CHANGE_PAGE,
  SET_CHOOSE_WORKER,
  MISS_APP_ERROR
} from '../actions/types'

const initialState = {
  forOrder: {
    freeWorkers: [],
    masterId: null,
    order: {}
  },
  dataLoad: false,
  isMakeOrder: false,
  makeOrderError: null,
  chooseWorker: false,
  showModal: false,
  page: null
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
        makeOrderError: action.payload
      }

    case CHANGE_PAGE:
      return {
        ...state,
        page: action.payload
      }

    case MISS_APP_ERROR:
      return {
        ...state,
        showModal: false,
        makeOrderError: null
      }

    case SET_CHOOSE_WORKER:
      return {
        ...state,
        forOrder: {
          ...state.forOrder,
          masterId: action.payload
        }
      }

    default:
      return state
  }
}

export default appReducer
