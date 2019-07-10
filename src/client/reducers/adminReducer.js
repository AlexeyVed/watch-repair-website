import {
  CHANGE_ADMIN_VIEW,
  LOAD_DATA_STARTED,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_FAILURE
} from '../actions/types'

const initialState = {
  view: null,
  dataLoad: false,
  dataError: null,
  data: {
    clocks: [],
    cities: [],
    users: [],
    workers: []
  }

}

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_ADMIN_VIEW:
      return {
        ...state,
        view: action.payload
      }

    case LOAD_DATA_STARTED:
      return {
        ...state,
        dataLoad: true
      }

    case LOAD_DATA_SUCCESS:
      return {
        ...state,
        dataLoad: false,
        data: action.payload
      }

    case LOAD_DATA_FAILURE:
      return {
        ...state,
        dataLoad: false,
        dataError: action.payload
      }

    default:
      return state
  }
  return state
}

export default adminReducer
