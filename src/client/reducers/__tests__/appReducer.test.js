import reducer from '../appReducer.js'
import * as types from '../../actions/types.js'

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
  showModal: false
}

describe('App reducer', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  test('should missing errors', () => {
    expect(
      reducer(initialState, {
        type: types.MISS_ERRORS
      })
    ).toEqual({
      ...initialState,
      error: null,
      showModal: false
    })
  })

  test('should make order started', () => {
    expect(
      reducer(initialState, {
        type: types.MAKE_ORDER_STARTED
      })
    ).toEqual({
      ...initialState,
      isMakeOrder: true
    })
  })

  test('should make order successes', () => {
    const action = {
      type: types.MAKE_ORDER_SUCCESS,
      payload: {
        data: ['worker'],
        values: {
          id: 1
        }
      }
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      chooseWorker: true,
      forOrder: {
        ...initialState.forOrder,
        freeWorkers: action.payload.data,
        order: action.payload.values
      }
    })
  })

  test('should make order error', () => {
    const action = {
      type: types.MAKE_ORDER_FAILURE,
      payload: 'error'
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      showModal: true,
      error: action.payload
    })
  })

  test('should return home page', () => {
    const action = {
      type: types.RETURN_HOME_PAGE
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      forOrder: {
        ...initialState.forOrder,
        order: null
      }
    })
  })

  test('should make order started', () => {
    expect(
      reducer(initialState, {
        type: types.MAKE_ORDER_WITH_MASTER_STARTED
      })
    ).toEqual({
      ...initialState,
      isMakeOrder: true
    })
  })

  test('should make order with master successes', () => {
    const action = {
      type: types.MAKE_ORDER_WITH_MASTER_SUCCESS
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      showModal: true,
      forOrder: {
        freeWorkers: [],
        insertId: null,
        masterId: null
      }
    })
  })

  test('should make order with master failure', () => {
    const action = {
      type: types.MAKE_ORDER_WITH_MASTER_FAILURE,
      payload: 'error'
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      showModal: true,
      forOrder: {
        ...initialState.forOrder,
        masterId: null
      },
      error: action.payload
    })
  })

  test('should change page', () => {
    const action = {
      type: types.CHANGE_PAGE,
      payload: 'error'
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      page: action.payload
    })
  })

  test('should set choose worker', () => {
    const action = {
      type: types.SET_CHOOSE_WORKER,
      payload: 1
    }
    expect(reducer(initialState, action)
    ).toEqual({
      ...initialState,
      forOrder: {
        ...initialState.forOrder,
        masterId: action.payload
      }
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
