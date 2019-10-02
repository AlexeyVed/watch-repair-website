import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../appActions.js'
import * as types from '../types.js'
import moxios from 'moxios'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Sync actions', () => {
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
    const data = [{ a: 1 }, { b: 2 }, [ 1, 2, 3 ]]
    const testValue = data.map(elem => ({
      type: types.MAKE_ORDER_SUCCESS,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.makeOrderSuccess(test.payload)).toEqual(test)
    })
  })

  it('should create an action makeOrderFailure', () => {
    const data = ['error', { code: 404, text: 'Not Found!' }]
    const testValue = data.map(elem => ({
      type: types.MAKE_ORDER_FAILURE,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.makeOrderFailure(test.payload)).toEqual(test)
    })
  })

  it('should create an action makeOrderMasterFailure', () => {
    const data = ['error', { code: 404, text: 'Not Found!' }]
    const testValue = data.map(elem => ({
      type: types.MAKE_ORDER_WITH_MASTER_FAILURE,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.makeOrderMasterFailure(test.payload)).toEqual(test)
    })
  })

  describe('Async functions', () => {
    let store

    beforeEach(function () {
      moxios.install()
      store = mockStore({})
    })

    afterEach(function () {
      moxios.uninstall()
    })

    it('Axios addOrder success', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 201,
          response: ['uzgorod', 'dnipro']
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
          response: [{ code: 404, b: 'Not Found!' }]
        })
      })

      const expectedActions = [
        { type: types.MAKE_ORDER_WITH_MASTER_STARTED },
        { type: types.MAKE_ORDER_WITH_MASTER_FAILURE, payload: [{ code: 404, b: 'Not Found!' }] }
      ]

      return store.dispatch(actions.addOrder({}))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Axios makeOrder success', () => {
      const values = {
        cityId: '1',
        clockId: '1',
        time: '1'
      }
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 201,
          response: { order: true }
        })
      })

      const expectedActions = [
        { type: types.MAKE_ORDER_STARTED },
        { type: types.MAKE_ORDER_SUCCESS, payload: { data: { order: true }, values: values } }
      ]

      return store.dispatch(actions.makeOrder(values))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Axios makeOrder failure', () => {
      const values = {
        cityId: '1',
        clockId: '1',
        time: '1'
      }
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 404,
          response: [{ code: 404, data: 'Not Found!' }]
        })
      })

      const expectedActions = [
        { type: types.MAKE_ORDER_STARTED },
        { type: types.MAKE_ORDER_FAILURE, payload: [{ code: 404, data: 'Not Found!' }] }
      ]

      return store.dispatch(actions.makeOrder(values))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })
})
