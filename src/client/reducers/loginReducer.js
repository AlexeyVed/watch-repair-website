import {
  SING_IN_SUCCESS,
  SING_IN_FAILURE,
  SING_IN_STARTED,
  /*  REGISTRATION_STARTED,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE, */
  LOG_OUT,
  SING_IN_FROM_LOCAL_STORAGE,
  LOGIN_ERROR_NULL
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
        singInLoading: false,
        singInError: null
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
        singInLoading: true,
        singInError: null
      }
      /*
    case REGISTRATION_STARTED:
      return {
        ...state,
        singInLoading: true
      }

    case REGISTRATION_SUCCESS:
      return {
        ...state,
        singInUser: action.payload,
        singInLoading: false,
        singInError: null
      }

    case REGISTRATION_FAILURE:
      return {
        ...state,
        singInLoading: false,
        singInError: action.payload
      }
*/
    case SING_IN_FROM_LOCAL_STORAGE:
      return {
        ...state,
        singInUser: action.payload,
        singInError: null
      }

    case LOG_OUT:
      return {
        ...state,
        singInUser: action.payload
      }

    case LOGIN_ERROR_NULL:
      return {
        ...state,
        singInError: null
      }

    default:
      return state
  }
}

export default loginReducer
