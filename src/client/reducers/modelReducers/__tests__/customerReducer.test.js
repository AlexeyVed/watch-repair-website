import reducer from '../customerReducer.js'
import * as types from '../../../actions/types.js'

const initialState = {
  data: [],
  error: null,
  redirectBackFromRefactor: false,
  refactorModelInProcess: false,
  showModal: false,
  message: null,
  dataLoad: false
}

describe('Customer reducer', () => {
  test('should load customers started', () => {
    const action = {
      type: types.LOAD_CUSTOMERS_STARTED
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      dataLoad: true
    })
  })

  test('should load customers success', () => {
    const action = {
      type: types.LOAD_CUSTOMERS_SUCCESS,
      payload: 'data'
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      data: action.payload
    })
  })

  test('should load customers failure', () => {
    const action = {
      type: types.LOAD_CUSTOMERS_FAILURE,
      payload: 'error'
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      showModal: true,
      error: action.payload
    })
  })

  test('should add customers failure', () => {
    const action = {
      type: types.ADD_CUSTOMER_FAILURE,
      payload: 'error'
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      showModal: true,
      error: action.payload
    })
  })

  test('should add customers started', () => {
    const action = {
      type: types.ADD_CUSTOMER_STARTED
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      refactorModelInProcess: true
    })
  })

  test('should add customers success', () => {
    const action = {
      type: types.ADD_CUSTOMER_SUCCESS,
      payload: 'customers',
      message: 'hello'
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      data: [
        ...initialState.data,
        action.payload
      ],
      redirectBackFromRefactor: true,
      showModal: true,
      message: action.message
    })
  })

  test('should edit customers started', () => {
    const action = {
      type: types.EDIT_CUSTOMER_STARTED
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      refactorModelInProcess: true
    })
  })

  test('should edit customers failure', () => {
    const action = {
      type: types.EDIT_CUSTOMER_FAILURE,
      payload: 'error'
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      error: action.payload,
      showModal: true
    })
  })

  test('should edit customers successes', () => {
    const action = {
      type: types.EDIT_CUSTOMER_SUCCESS,
      payload: { id: 1, city: 'customers' },
      message: 'hello'
    }
    expect(reducer({ ...initialState, data: [ { id: 1, city: 'customers' }, { id: 2, city: 'Dnipro' } ] }, action)
    ).toEqual({
      ...initialState,
      data: { ...initialState, data: [ { id: 1, city: 'customers' }, { id: 2, city: 'Dnipro' } ] }.data.map(city => {
        if (city.id === Number(action.payload.id)) {
          action.payload.id = Number(action.payload.id)
          return action.payload
        }
        return city
      }),
      redirectBackFromRefactor: true,
      showModal: true,
      message: action.message
    })
  })

  test('should delete customers failure', () => {
    const action = {
      type: types.DELETE_CUSTOMER_FAILURE,
      payload: 'error'
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      error: action.payload,
      showModal: true
    })
  })

  test('should delete customers started', () => {
    const action = {
      type: types.DELETE_CUSTOMER_STARTED
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      refactorModelInProcess: true
    })
  })

  test('should delete customers success', () => {
    const action = {
      type: types.DELETE_CUSTOMER_SUCCESS,
      payload: 1,
      message: 'hello'
    }
    expect(reducer({ ...initialState, data: [{ id: 1 }] }, action)
    ).toEqual({
      ...initialState,
      data: { ...initialState, data: [{ id: 1 }] }.data.filter(el => el.id !== +action.payload),
      refactorModelInProcess: false,
      showModal: true,
      message: action.message
    })
  })

  test('should redirect from refactor', () => {
    const action = {
      type: types.REDIRECT_FROM_REFACTOR
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      redirectBackFromRefactor: false
    })
  })

  test('should miss errors', () => {
    const action = {
      type: types.MISS_ERRORS
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      error: null,
      showModal: false,
      message: null
    })
  })

  test('should miss errors', () => {
    const action = {
      type: types.END_LOAD_DATA
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      dataLoad: false
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
