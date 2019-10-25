import reducer from '../loginReducer.js'
import * as types from '../../actions/types.js'

const initialState = {
  isAuth: false,
  singInUser: null,
  singInLoading: false,
  singInError: null
}

describe('Login reducer', () => {
  test('should log out', () => {
    const action = {
      type: types.LOG_OUT
    }
    expect(reducer(initialState, action)
    ).toEqual(initialState)
  })

  test('should miss login error', () => {
    const action = {
      type: types.LOGIN_ERROR_NULL
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      singInError: null
    })
  })

  test('should started sing in', () => {
    const action = {
      type: types.SING_IN_STARTED
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      singInLoading: true,
      singInError: null
    })
  })

  test('should sing in failure', () => {
    const action = {
      type: types.SING_IN_FAILURE,
      payload: 'error'
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      singInLoading: false,
      singInError: action.payload
    })
  })

  test('should sing in failure', () => {
    const action = {
      type: types.SING_IN_SUCCESS,
      payload: 'user'
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      singInLoading: false,
      singInUser: action.payload,
      singInError: null
    })
  })

  test('should sing in failure', () => {
    const action = {
      type: types.SING_IN_SUCCESS,
      payload: 'user'
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      singInLoading: false,
      singInUser: action.payload,
      singInError: null
    })
  })

  test('Default', () => {
    const action = {
      type: 'Some wrong action'
    }
    expect(reducer(initialState, action)
    ).toEqual(initialState)
  })
})
