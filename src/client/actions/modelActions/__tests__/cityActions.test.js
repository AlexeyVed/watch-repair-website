import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../cityActions.js'
import * as types from '../../types.js'
import moxios from 'moxios'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('City actions', () => {
  let store

  beforeEach(function () {
    moxios.install()
    store = mockStore({})
  })

  afterEach(function () {
    moxios.uninstall()
  })

  it('should create an action load failure', () => {
    const data = ['cities', 'orders']
    const testValue = data.map(elem => ({
      type: types.LOAD_CITIES_FAILURE,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.loadCitiesFailure(test.payload)).toEqual(test)
    })
  })

  it('should create an action load successes', () => {
    const data = ['cities', 'orders']
    const testValue = data.map(elem => ({
      type: types.LOAD_CITIES_SUCCESS,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.loadCitiesSuccess(test.payload)).toEqual(test)
    })
  })

  it('should create an action add failure', () => {
    const data = ['cities', 'orders']
    const testValue = data.map(elem => ({
      type: types.ADD_CITY_FAILURE,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.addCitiesFailure(test.payload)).toEqual(test)
    })
  })

  it('should create an action delete failure', () => {
    const data = ['cities', 'orders']
    const testValue = data.map(elem => ({
      type: types.DELETE_CITY_FAILURE,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.deleteCitiesFailure(test.payload)).toEqual(test)
    })
  })

  it('should create an action edit failure', () => {
    const data = ['cities', 'orders']
    const testValue = data.map(elem => ({
      type: types.EDIT_CITY_FAILURE,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.editCitiesFailure(test.payload)).toEqual(test)
    })
  })

  it('should create an action add successes', () => {
    const data = ['cities', 'orders']
    const testValue = data.map(elem => ({
      type: types.ADD_CITY_SUCCESS,
      message: 'City was successfully added.',
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.addCitiesSuccess(test.payload)).toEqual(test)
    })
  })

  it('should create an action delete successes', () => {
    const data = ['cities', 'orders']
    const testValue = data.map(elem => ({
      type: types.DELETE_CITY_SUCCESS,
      message: 'City was successfully removed.',
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.deleteCitiesSuccess(test.payload)).toEqual(test)
    })
  })

  it('should create an action edit successes', () => {
    const data = ['cities', 'orders']
    const testValue = data.map(elem => ({
      type: types.EDIT_CITY_SUCCESS,
      message: 'City was successfully edited.',
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.editCitiesSuccess(test.payload)).toEqual(test)
    })
  })

  it('Axios load city success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: ['uzgorod', 'dnipro']
      })
    })

    const expectedActions = [
      { type: types.LOAD_CITIES_STARTED },
      { type: types.LOAD_CITIES_SUCCESS, payload: ['uzgorod', 'dnipro'] }
    ]

    return store.dispatch(actions.loadCities())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios load city failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 404,
        response: ['uzgorod', 'dnipro']
      })
    })

    const expectedActions = [
      { type: types.LOAD_CITIES_STARTED },
      { type: types.LOAD_CITIES_FAILURE, payload: ['uzgorod', 'dnipro'] }
    ]

    return store.dispatch(actions.loadCities())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios addCityToDB success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 201,
        response: ['uzgorod']
      })
    })

    const expectedActions = [
      { type: types.ADD_CITY_STARTED },
      { type: types.ADD_CITY_SUCCESS, message: 'City was successfully added.', payload: ['uzgorod'] },
      { type: types.REDIRECT_FROM_REFACTOR }
    ]

    return store.dispatch(actions.addCityToDB({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios addCityToDB failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 404,
        response: ['uzgorod', 'dnipro']
      })
    })

    const expectedActions = [
      { type: types.ADD_CITY_STARTED },
      { type: types.ADD_CITY_FAILURE, payload: ['uzgorod', 'dnipro'] }
    ]

    return store.dispatch(actions.addCityToDB({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios editCityIntoDB success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 201,
        response: ['uzgorod']
      })
    })

    const expectedActions = [
      { type: types.EDIT_CITY_STARTED },
      { type: types.EDIT_CITY_SUCCESS, message: 'City was successfully edited.', payload: ['uzgorod'] },
      { type: types.REDIRECT_FROM_REFACTOR }
    ]

    return store.dispatch(actions.editCityIntoDB({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios editCityIntoDB failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 404,
        response: ['uzgorod', 'dnipro']
      })
    })

    const expectedActions = [
      { type: types.EDIT_CITY_STARTED },
      { type: types.EDIT_CITY_FAILURE, payload: ['uzgorod', 'dnipro'] }
    ]

    return store.dispatch(actions.editCityIntoDB({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios deleteCityFromDB success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 201,
        response: ['uzgorod']
      })
    })

    const expectedActions = [
      { type: types.DELETE_CITY_STARTED },
      { type: types.DELETE_CITY_SUCCESS, message: 'City was successfully removed.', payload: ['uzgorod'] }
    ]

    return store.dispatch(actions.deleteCityFromDB({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios deleteCityFromDB failure', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 404,
        response: ['uzgorod', 'dnipro']
      })
    })

    const expectedActions = [
      { type: types.DELETE_CITY_STARTED },
      { type: types.DELETE_CITY_FAILURE, payload: ['uzgorod', 'dnipro'] }
    ]

    return store.dispatch(actions.deleteCityFromDB({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
