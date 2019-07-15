import {
  LOAD_DATA_USER_STARTED,
  LOAD_DATA_USER_SUCCESS,
  LOAD_DATA_USER_FAILURE
} from '../actions/types'

const initialState = {
  data: {
    clocks: [],
    cities: [],
    workers: []
  },
  dataLoad: false,
  dataError: null
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_DATA_USER_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case LOAD_DATA_USER_SUCCESS:
      return {
        ...state,
        dataLoad: false,
        data: {
          ...state.data,
          clocks: action.payload[0],
          cities: action.payload[1],
          workers: action.payload[2]
        }
      }

    case LOAD_DATA_USER_FAILURE:
      return {
        ...state,
        dataLoad: false,
        dataError: action.payload
      }

    default:
      return state
  }
}

export default appReducer
