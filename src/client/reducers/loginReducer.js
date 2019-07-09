import {
  SING_IN_SUCCESS,
  SING_IN_FAILURE,
  SING_IN_STARTED,
  LOG_OUT,
  REDIRECT_LOGIN_SUCCESS
} from '../actions/types'

const initialState = {
  singInUser: null,
  redirectLoginSuccess: false,
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

    case REDIRECT_LOGIN_SUCCESS:
      return {
        ...state,
        redirectLoginSuccess: !state.redirectLoginSuccess
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
