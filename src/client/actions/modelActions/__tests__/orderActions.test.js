import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../orderActions.js'
import * as types from '../../types.js'
import moxios from 'moxios'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Order actions', () => {

    let store

    beforeEach(function () {
        moxios.install();
        store = mockStore({})
    })
    
      afterEach(function () {
        moxios.uninstall();
    })

    it('should create an action load failure', () => {
        const data = ['ORDERS', 'orders']
        const testValue = data.map(elem => ({
            type: types.LOAD_ORDERS_FAILURE,
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.loadOrdersFailure(test.payload)).toEqual(test)
        })
    })

    it('should create an action load successes', () => {
        const data = ['ORDERS', 'orders']
        const testValue = data.map(elem => ({
            type: types.LOAD_ORDERS_SUCCESS,
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.loadOrdersSuccess(test.payload)).toEqual(test)
        })
    })

    it('should create an action add failure', () => {
        const data = ['ORDERS', 'orders']
        const testValue = data.map(elem => ({
            type: types.ADD_ORDERS_FAILURE,
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.addOrdersFailure(test.payload)).toEqual(test)
        })
    })

    it('should create an action delete failure', () => {
        const data = ['ORDERS', 'orders']
        const testValue = data.map(elem => ({
            type: types.DELETE_ORDERS_FAILURE,
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.deleteOrdersFailure(test.payload)).toEqual(test)
        })
    })

    it('should create an action edit failure', () => {
        const data = ['ORDERS', 'orders']
        const testValue = data.map(elem => ({
            type: types.EDIT_ORDERS_FAILURE,
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.editOrdersFailure(test.payload)).toEqual(test)
        })
    })

    it('should create an action add successes', () => {
        const data = ['ORDERS', 'orders']
        const testValue = data.map(elem => ({
            type: types.ADD_ORDERS_SUCCESS,
            message: 'Order was successfully added.',
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.addOrdersSuccess(test.payload)).toEqual(test)
        })
    })

    it('should create an action delete successes', () => {
        const data = ['ORDERS', 'orders']
        const testValue = data.map(elem => ({
            type: types.DELETE_ORDERS_SUCCESS,
            message: 'Order was successfully removed.',
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.deleteOrdersSuccess(test.payload)).toEqual(test)
        })
    })

    it('should create an action edit successes', () => {
        const data = ['ORDERS', 'orders']
        const testValue = data.map(elem => ({
            type: types.EDIT_ORDERS_SUCCESS,
            message: 'Order was successfully edited.',
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.editOrdersSuccess(test.payload)).toEqual(test)
        })
    })

    it('Axios load order success', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: ['uzgorod', 'dnipro'],
            })
        })

        const expectedActions = [
            { type: types.LOAD_ORDERS_STARTED },
            { type: types.LOAD_ORDERS_SUCCESS, payload: ['uzgorod', 'dnipro'] }   
        ]

        return store.dispatch(actions.loadOrders())
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    
    it('Axios load clock failure', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 404,
            response: ['uzgorod', 'dnipro'],
            })
        })
    
        const expectedActions = [
            { type: types.LOAD_ORDERS_STARTED },
            { type: types.LOAD_ORDERS_FAILURE, payload: ['uzgorod', 'dnipro'] }   
        ]

        return store.dispatch(actions.loadOrders())
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Axios addOrdersToDB success', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 201,
            response: ['uzgorod'],
            })
        })
    
        const expectedActions = [
            { type: types.ADD_ORDERS_STARTED },
            { type: types.ADD_ORDERS_SUCCESS, message: 'Order was successfully added.', payload: ['uzgorod'] },
            { type: types.REDIRECT_FROM_REFACTOR }   
        ]
   
        return store.dispatch(actions.addOrdersToDB({}))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    
    it('Axios addOrdersToDB failure', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 404,
            response: ['uzgorod', 'dnipro'],
            })
        })
        
        const expectedActions = [
            { type: types.ADD_ORDERS_STARTED },
            { type: types.ADD_ORDERS_FAILURE, payload: ['uzgorod', 'dnipro'] }   
        ]
    
        return store.dispatch(actions.addOrdersToDB({}))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Axios editOrdersIntoDB success', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 201,
            response: ['uzgorod'],
            })
        })
    
        const expectedActions = [
            { type: types.EDIT_ORDERS_STARTED },
            { type: types.EDIT_ORDERS_SUCCESS, message: 'Order was successfully edited.', payload: ['uzgorod'] },
            { type: types.REDIRECT_FROM_REFACTOR }   
        ]
   
        return store.dispatch(actions.editOrdersIntoDB({}))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    
    it('Axios editOrdersIntoDB failure', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 404,
            response: ['uzgorod', 'dnipro'],
            })
        })
        
        const expectedActions = [
            { type: types.EDIT_ORDERS_STARTED },
            { type: types.EDIT_ORDERS_FAILURE, payload: ['uzgorod', 'dnipro'] }   
        ]
    
        return store.dispatch(actions.editOrdersIntoDB({}))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Axios deleteOrdersFromDB success', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 201,
            response: ['uzgorod'],
            })
        })
    
        const expectedActions = [
            { type: types.DELETE_ORDERS_STARTED },
            { type: types.DELETE_ORDERS_SUCCESS, message: 'Order was successfully removed.', payload: ['uzgorod'] } 
        ]
   
        return store.dispatch(actions.deleteOrdersFromDB({}))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    
    it('Axios deleteOrdersFromDB failure', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 404,
            response: ['uzgorod', 'dnipro'],
            })
        })
        
        const expectedActions = [
            { type: types.DELETE_ORDERS_STARTED },
            { type: types.DELETE_ORDERS_FAILURE, payload: ['uzgorod', 'dnipro'] }   
        ]
    
        return store.dispatch(actions.deleteOrdersFromDB({}))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})

// 

// describe('async actions', () => {
//     afterEach(() => {
//       fetchMock.restore()
//     })
  
//     it('creates MAKE_ORDER_SUCCESS when fetching has been done', () => {
//         const values = { 
//             cityId: 1,
//             clockId: 2,
//             date: '2019-12-20',
//             time: 12
//         }
//         fetchMock.mock('/api/orders/freeORDERS', {
//         body: values,
//         headers: { 'content-type': 'application/json' }
//         })
  
//         const expectedActions = [
//         { type: types.MAKE_ORDER_STARTED },
//         { type: types.MAKE_ORDER_SUCCESS, payload: [
//             {
//                 "id": 1,
//                 "name": "Sergey",
//                 "rating": 5,
//                 "cityId": 1,
//                 "city": {
//                     "id": 1,
//                     "city": "Dnipro"
//                 }
//             }
//         ] }
//         ]
//         const store = mockStore({ forOrder: {
//             freeWorkers: [] 
//         } })
  
//         return new Promise ((res, rej) => {
//             return store.dispatch(actions.makeOrder(values))
//         })
//         .then((data) => {
//             expect(store.getActions(data)).toEqual(expectedActions)
//         })
//     })
//   })