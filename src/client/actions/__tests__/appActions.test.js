import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../appActions.js'
import * as types from '../types.js'
import moxios from 'moxios'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('App actions', () => {
  let store

  beforeEach(function () {
    moxios.install()
    store = mockStore({})
  })

  afterEach(function () {
    moxios.uninstall()
  })

  it('should create an action setPage', () => {
    const data = ['cities', 'orders', 'masters']
    const testValue = data.map(elem => ({
      type: types.CHANGE_PAGE,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.setPage(test.payload)).toEqual(test)
    })
  })

  it('should create an action returnHomePage', () => {
    const expectedValue = {
      type: types.RETURN_HOME_PAGE
    }
    expect(actions.returnPageHome()).toEqual(expectedValue)
  })

  it('should create an action missError', () => {
    const expectedValue = {
      type: types.MISS_ERRORS
    }
    expect(actions.missErrors()).toEqual(expectedValue)
  })

  it('should create an action endLoadData', () => {
    const expectedValue = {
      type: types.END_LOAD_DATA
    }
    expect(actions.loadDataEnd()).toEqual(expectedValue)
  })

  it('should create an action setChooseWorker', () => {
    const data = [1, 23, 20]
    const testValue = data.map(elem => ({
      type: types.SET_CHOOSE_WORKER,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.setChooseWorker(test.payload)).toEqual(test)
    })
  })

  it('should create an action makeOrderSuccess', () => {
    const data = [1, 'Order!', { city: 2, date: '2019-10-10' }]
    const testValue = data.map(elem => ({
      type: types.MAKE_ORDER_SUCCESS,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.makeOrderSuccess(test.payload)).toEqual(test)
    })
  })

  it('should create an action makeOrderFailure', () => {
    const data = [1, 'Error!!', { code: 404, text: 'Not Found!' }]
    const testValue = data.map(elem => ({
      type: types.MAKE_ORDER_FAILURE,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.makeOrderFailure(test.payload)).toEqual(test)
    })
  })

  it('should create an action makeOrderMasterFailure', () => {
    const data = [1, 'Error!!', { code: 404, text: 'Not Found!' }]
    const testValue = data.map(elem => ({
      type: types.MAKE_ORDER_WITH_MASTER_FAILURE,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.makeOrderMasterFailure(test.payload)).toEqual(test)
    })
  })

  it('Axios makeOrder success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 201,
        response: [{ name: 'Free master' }, { name: 'Second free master' }]
      })
    })

    const expectedActions = [
      { type: types.MAKE_ORDER_STARTED },
      { type: types.MAKE_ORDER_SUCCESS,
        payload: {
          data: [{ name: 'Free master' }, { name: 'Second free master' }],
          values: {
            cityId: 2,
            clockId: 2,
            time: 10 }
        }
      }
    ]

    return store.dispatch(actions.makeOrder({ cityId: '2', clockId: '2', time: 10 }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios makeOrder failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 404,
        response: { message: 'Masters not found' }
      })
    })

    const expectedActions = [
      { type: types.MAKE_ORDER_STARTED },
      { type: types.MAKE_ORDER_FAILURE, payload: { message: 'Masters not found' } }
    ]

    return store.dispatch(actions.makeOrder({ cityId: 2, clockId: 2, time: 10 }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios addOrder success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 201,
        response: 'OK'
      })
    })

    const expectedActions = [
      { type: types.MAKE_ORDER_WITH_MASTER_STARTED },
      { type: types.MAKE_ORDER_WITH_MASTER_SUCCESS }
    ]

    return store.dispatch(actions.addOrder({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios addOrder failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 404,
        response: { message: 'Add order failure' }
      })
    })

    const expectedActions = [
      { type: types.MAKE_ORDER_WITH_MASTER_STARTED },
      { type: types.MAKE_ORDER_WITH_MASTER_FAILURE, payload: { message: 'Add order failure' } }
    ]

    return store.dispatch(actions.addOrder({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
