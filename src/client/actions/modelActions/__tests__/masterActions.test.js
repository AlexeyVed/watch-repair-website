import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../masterActions.js'
import * as types from '../../types.js'
import moxios from 'moxios'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Master actions', () => {
  let store

  beforeEach(function () {
    moxios.install()
    store = mockStore({})
  })

  afterEach(function () {
    moxios.uninstall()
  })

  it('should create an action load failure', () => {
    const data = ['Masters', 'orders']
    const testValue = data.map(elem => ({
      type: types.LOAD_MASTERS_FAILURE,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.loadMastersFailure(test.payload)).toEqual(test)
    })
  })

  it('should create an action load successes', () => {
    const data = ['Masters', 'orders']
    const testValue = data.map(elem => ({
      type: types.LOAD_MASTERS_SUCCESS,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.loadMastersSuccess(test.payload)).toEqual(test)
    })
  })

  it('should create an action add failure', () => {
    const data = ['Masters', 'orders']
    const testValue = data.map(elem => ({
      type: types.ADD_MASTER_FAILURE,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.addMastersFailure(test.payload)).toEqual(test)
    })
  })

  it('should create an action delete failure', () => {
    const data = ['Masters', 'orders']
    const testValue = data.map(elem => ({
      type: types.DELETE_MASTER_FAILURE,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.deleteMastersFailure(test.payload)).toEqual(test)
    })
  })

  it('should create an action edit failure', () => {
    const data = ['Masters', 'orders']
    const testValue = data.map(elem => ({
      type: types.EDIT_MASTER_FAILURE,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.editMastersFailure(test.payload)).toEqual(test)
    })
  })

  it('should create an action add successes', () => {
    const data = ['Masters', 'orders']
    const testValue = data.map(elem => ({
      type: types.ADD_MASTER_SUCCESS,
      message: 'Master was successfully added.',
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.addMastersSuccess(test.payload)).toEqual(test)
    })
  })

  it('should create an action delete successes', () => {
    const data = ['Masters', 'orders']
    const testValue = data.map(elem => ({
      type: types.DELETE_MASTER_SUCCESS,
      message: 'Master was successfully removed.',
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.deleteMastersSuccess(test.payload)).toEqual(test)
    })
  })

  it('should create an action edit successes', () => {
    const data = ['Masters', 'orders']
    const testValue = data.map(elem => ({
      type: types.EDIT_MASTER_SUCCESS,
      message: 'Master was successfully edited.',
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.editMastersSuccess(test.payload)).toEqual(test)
    })
  })

  it('Axios load master success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: ['uzgorod', 'dnipro']
      })
    })

    const expectedActions = [
      { type: types.LOAD_MASTERS_STARTED },
      { type: types.LOAD_MASTERS_SUCCESS, payload: ['uzgorod', 'dnipro'] }
    ]

    return store.dispatch(actions.loadMasters())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios load master failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 404,
        response: ['uzgorod', 'dnipro']
      })
    })

    const expectedActions = [
      { type: types.LOAD_MASTERS_STARTED },
      { type: types.LOAD_MASTERS_FAILURE, payload: ['uzgorod', 'dnipro'] }
    ]

    return store.dispatch(actions.loadMasters())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios addMastersToDB success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 201,
        response: ['uzgorod']
      })
    })

    const expectedActions = [
      { type: types.ADD_MASTER_STARTED },
      { type: types.ADD_MASTER_SUCCESS, message: 'Master was successfully added.', payload: ['uzgorod'] },
      { type: types.REDIRECT_FROM_REFACTOR }
    ]

    return store.dispatch(actions.addMastersToDB({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios addMastersToDB failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 404,
        response: ['uzgorod', 'dnipro']
      })
    })

    const expectedActions = [
      { type: types.ADD_MASTER_STARTED },
      { type: types.ADD_MASTER_FAILURE, payload: ['uzgorod', 'dnipro'] }
    ]

    return store.dispatch(actions.addMastersToDB({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios editMastersIntoDB success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 201,
        response: ['uzgorod']
      })
    })

    const expectedActions = [
      { type: types.EDIT_MASTER_STARTED },
      { type: types.EDIT_MASTER_SUCCESS, message: 'Master was successfully edited.', payload: ['uzgorod'] },
      { type: types.REDIRECT_FROM_REFACTOR }
    ]

    return store.dispatch(actions.editMastersIntoDB({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios editMastersIntoDB failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 404,
        response: ['uzgorod', 'dnipro']
      })
    })

    const expectedActions = [
      { type: types.EDIT_MASTER_STARTED },
      { type: types.EDIT_MASTER_FAILURE, payload: ['uzgorod', 'dnipro'] }
    ]

    return store.dispatch(actions.editMastersIntoDB({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios deleteMastersFromDB success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 201,
        response: ['uzgorod']
      })
    })

    const expectedActions = [
      { type: types.DELETE_MASTER_STARTED },
      { type: types.DELETE_MASTER_SUCCESS, message: 'Master was successfully removed.', payload: ['uzgorod'] }
    ]

    return store.dispatch(actions.deleteMastersFromDB({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios deleteMastersFromDB failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 404,
        response: ['uzgorod', 'dnipro']
      })
    })

    const expectedActions = [
      { type: types.DELETE_MASTER_STARTED },
      { type: types.DELETE_MASTER_FAILURE, payload: ['uzgorod', 'dnipro'] }
    ]

    return store.dispatch(actions.deleteMastersFromDB({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
