import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../loginActions.js'
import * as types from '../types.js'
import moxios from 'moxios'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Login actions', () => {
  let store

  beforeEach(function () {
    moxios.install()
    store = mockStore({})
  })

  afterEach(function () {
    moxios.uninstall()
  })

  it('should create an action missLoginError', () => {
    expect(actions.missLoginError()).toEqual({ type: types.LOGIN_ERROR_NULL })
  })

  it('should create an action singInSuccess', () => {
    const data = ['admin@ex.com', 'fighter@ex.com', 'masters']
    const testValue = data.map(elem => ({
      type: types.SING_IN_SUCCESS,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.singInSuccess(test.payload)).toEqual(test)
    })
  })

  it('should create an action singInFailure', () => {
    const data = ['Wrong password', 'User not found!']
    const testValue = data.map(elem => ({
      type: types.SING_IN_FAILURE,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.singInFailure(test.payload)).toEqual(test)
    })
  })

  it('Axios logOutApp success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 201,
        response: 'OK'
      })
    })

    const expectedActions = [
      { type: types.LOG_OUT }
    ]

    return store.dispatch(actions.logOutApp({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios logOutApp faulire', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 404,
        response: { message: 'Error!' }
      })
    })

    const expectedActions = [
      { type: types.SING_IN_FAILURE, payload: { message: 'Error!' } }
    ]

    return store.dispatch(actions.logOutApp({ message: 'Error!' }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios loginToApp success', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 201,
        response: { user: { email: 'admin@example.com' }, token: 'asdasd' }
      })
    })

    const expectedActions = [
      { type: types.SING_IN_STARTED },
      { type: types.SING_IN_SUCCESS, payload: 'admin@example.com' }
    ]

    return store.dispatch(actions.loginToApp({}, true))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })

  it('Axios loginToApp error', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 401,
        response: { data: 'User not found!' }
      })
    })

    const expectedActions = [
      { type: types.SING_IN_STARTED },
      { type: types.SING_IN_FAILURE, payload: { data: 'User not found!' } }
    ]

    return store.dispatch(actions.loginToApp())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
