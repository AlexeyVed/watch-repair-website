import {
  SING_IN_SUCCESS,
  SING_IN_FAILURE,
  SING_IN_STARTED,
  LOG_OUT,
  LOGIN_ERROR_NULL,
  CHECK_ACCESS_ADMIN_STARTED,
  CHECK_ACCESS_ADMIN_SUCCESS,
  CHECK_ACCESS_ADMIN_FAILURE
} from '../actions/types.js'

const client = localStorage.getItem('user')

const initialState = {
  singInUser: client || null,
  singInLoading: false,
  singInError: null,
  isAuth: false
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

    case CHECK_ACCESS_ADMIN_STARTED:
      return {
        ...state,
        singInLoading: true
      }

    case CHECK_ACCESS_ADMIN_SUCCESS:
      return {
        ...state,
        singInLoading: false,
        singInError: null,
        isAuth: true
      }

    case CHECK_ACCESS_ADMIN_FAILURE:
      return {
        ...state,
        singInUser: null,
        singInLoading: false,
        singInError: action.payload,
        isAuth: false
      }

    case LOG_OUT:
      return {
        ...state,
        singInUser: null,
        isAuth: false
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
