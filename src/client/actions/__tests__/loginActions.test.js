import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../loginActions.js'
import * as types from '../types.js'
import moxios from 'moxios'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Sync actions', () => {
  it('should create an action missLoginError', () => {
    const testValue = [ 1, 2 ].map(elem => ({
      type: types.LOGIN_ERROR_NULL
    }))
    testValue.forEach(test => {
      expect(actions.missLoginError()).toEqual(test)
    })
  })

  it('should create an action singInSuccess', () => {
    const data = ['admin@example.com', { user: 'admin', token: 'token' }]
    const testValue = data.map(elem => ({
      type: types.SING_IN_SUCCESS,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.singInSuccess(test.payload)).toEqual(test)
    })
  })

  it('should create an action singInFailure', () => {
    const data = ['error', { code: 404, text: 'User not found!' }]
    const testValue = data.map(elem => ({
      type: types.SING_IN_FAILURE,
      payload: elem
    }))
    testValue.forEach(test => {
      expect(actions.singInFailure(test.payload)).toEqual(test)
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

    it('Axios loginToApp success', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 201,
          response: {
            user: {
              email: 'admin@gmail.com'
            },
            token: '123123123'
          }
        })
      })

      const expectedActions = [
        { type: types.SING_IN_STARTED },
        { type: types.SING_IN_SUCCESS, payload: 'admin@gmail.com' }
      ]

      return store.dispatch(actions.loginToApp({}, true))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Axios loginToApp faillure', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 404,
          response: 'Some error!'
        })
      })

      const expectedActions = [
        { type: types.SING_IN_STARTED },
        { type: types.SING_IN_FAILURE, payload: 'Some error!' }
      ]

      return store.dispatch(actions.loginToApp({}, true))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
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

      return store.dispatch(actions.logOutApp(true))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Axios logOutApp faillure', () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent()
        request.respondWith({
          status: 404,
          response: 'Some error!'
        })
      })

      const expectedActions = [
        { type: types.SING_IN_FAILURE, payload: 'Some error!' }
      ]

      return store.dispatch(actions.logOutApp(true))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions)
        })
    })
  })
})
