import {
  SING_IN_SUCCESS,
  SING_IN_FAILURE,
  SING_IN_STARTED,
  LOG_OUT,
  SING_IN_FROM_LOCAL_STORAGE
} from '../actions/types'

const initialState = {
  singInUser: null,
  singInLoading: false,
  singInError: null
}

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case SING_IN_SUCCESS:
      return {
        ...state,
        singInUser: action.payload,
        singInLoading: false
      }

    case SING_IN_FAILURE:
      return {
        ...state,
        singInLoading: false,
        singInError: action.payload
      }

    case SING_IN_STARTED:
      return {
        ...state,
        singInLoading: true
      }

    case SING_IN_FROM_LOCAL_STORAGE:
      return {
        ...state,
        singInUser: action.payload
      }

    case LOG_OUT:
      return {
        ...state,
        singInUser: action.payload
      }

    default:
      return state
  }
  return state
}

export default loginReducer
