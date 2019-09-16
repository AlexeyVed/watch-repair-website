import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../customerActions.js'
import * as types from '../../types.js'
import moxios from 'moxios'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Customers actions', () => {

    let store

    beforeEach(function () {
        moxios.install();
        store = mockStore({})
    })
    
      afterEach(function () {
        moxios.uninstall();
    })

    it('should create an action load failure', () => {
        const data = ['cities', 'orders']
        const testValue = data.map(elem => ({
            type: types.LOAD_CUSTOMERS_FAILURE,
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.loadCustomersFailure(test.payload)).toEqual(test)
        })
    })

    it('should create an action load successes', () => {
        const data = ['cities', 'orders']
        const testValue = data.map(elem => ({
            type: types.LOAD_CUSTOMERS_SUCCESS,
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.loadCustomersSuccess(test.payload)).toEqual(test)
        })
    })

    it('should create an action add failure', () => {
        const data = ['cities', 'orders']
        const testValue = data.map(elem => ({
            type: types.ADD_CUSTOMERS_FAILURE,
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.addCustomersFailure(test.payload)).toEqual(test)
        })
    })

    it('should create an action delete failure', () => {
        const data = ['cities', 'orders']
        const testValue = data.map(elem => ({
            type: types.DELETE_CUSTOMERS_FAILURE,
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.deleteCustomersFailure(test.payload)).toEqual(test)
        })
    })

    it('should create an action edit failure', () => {
        const data = ['cities', 'orders']
        const testValue = data.map(elem => ({
            type: types.EDIT_CUSTOMERS_FAILURE,
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.editCustomersFailure(test.payload)).toEqual(test)
        })
    })

    it('should create an action add successes', () => {
        const data = ['cities', 'orders']
        const testValue = data.map(elem => ({
            type: types.ADD_CUSTOMERS_SUCCESS,
            message: 'Customer was successfully added.',
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.addCustomersSuccess(test.payload)).toEqual(test)
        })
    })

    it('should create an action delete successes', () => {
        const data = ['cities', 'orders']
        const testValue = data.map(elem => ({
            type: types.DELETE_CUSTOMERS_SUCCESS,
            message: 'Customer was successfully removed.',
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.deleteCustomersSuccess(test.payload)).toEqual(test)
        })
    })

    it('should create an action edit successes', () => {
        const data = ['cities', 'orders']
        const testValue = data.map(elem => ({
            type: types.EDIT_CUSTOMERS_SUCCESS,
            message: 'Customer was successfully edited.',
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.editCustomersSuccess(test.payload)).toEqual(test)
        })
    })

    
    it('Axios load customer success', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: ['uzgorod', 'dnipro'],
            })
        })

        const expectedActions = [
            { type: types.LOAD_CUSTOMERS_STARTED },
            { type: types.LOAD_CUSTOMERS_SUCCESS, payload: ['uzgorod', 'dnipro'] }   
        ]

        return store.dispatch(actions.loadCustomers())
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    
    it('Axios load customer failure', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 404,
            response: ['uzgorod', 'dnipro'],
            })
        })
    
        const expectedActions = [
            { type: types.LOAD_CUSTOMERS_STARTED },
            { type: types.LOAD_CUSTOMERS_FAILURE, payload: ['uzgorod', 'dnipro'] }   
        ]

        return store.dispatch(actions.loadCustomers())
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Axios addCustomersToDB success', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 201,
            response: ['uzgorod'],
            })
        })
    
        const expectedActions = [
            { type: types.ADD_CUSTOMERS_STARTED },
            { type: types.ADD_CUSTOMERS_SUCCESS, message: 'Customer was successfully added.', payload: ['uzgorod'] },
            { type: types.REDIRECT_FROM_REFACTOR }   
        ]
   
        return store.dispatch(actions.addCustomersToDB({}))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    
    it('Axios addCustomersToDB failure', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 404,
            response: ['uzgorod', 'dnipro'],
            })
        })
        
        const expectedActions = [
            { type: types.ADD_CUSTOMERS_STARTED },
            { type: types.ADD_CUSTOMERS_FAILURE, payload: ['uzgorod', 'dnipro'] }   
        ]
    
        return store.dispatch(actions.addCustomersToDB({}))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Axios editCustomersIntoDB success', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 201,
            response: ['uzgorod'],
            })
        })
    
        const expectedActions = [
            { type: types.EDIT_CUSTOMERS_STARTED },
            { type: types.EDIT_CUSTOMERS_SUCCESS, message: 'Customer was successfully edited.', payload: ['uzgorod'] },
            { type: types.REDIRECT_FROM_REFACTOR }   
        ]
   
        return store.dispatch(actions.editCustomersIntoDB({}))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    
    it('Axios editCustomersIntoDB failure', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 404,
            response: ['uzgorod', 'dnipro'],
            })
        })
        
        const expectedActions = [
            { type: types.EDIT_CUSTOMERS_STARTED },
            { type: types.EDIT_CUSTOMERS_FAILURE, payload: ['uzgorod', 'dnipro'] }   
        ]
    
        return store.dispatch(actions.editCustomersIntoDB({}))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Axios deleteCustomersFromDB success', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 201,
            response: ['uzgorod'],
            })
        })
    
        const expectedActions = [
            { type: types.DELETE_CUSTOMERS_STARTED },
            { type: types.DELETE_CUSTOMERS_SUCCESS, message: 'Customer was successfully removed.', payload: ['uzgorod'] } 
        ]
   
        return store.dispatch(actions.deleteCustomersFromDB({}))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    
    it('Axios deleteCustomersFromDB failure', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 404,
            response: ['uzgorod', 'dnipro'],
            })
        })
        
        const expectedActions = [
            { type: types.DELETE_CUSTOMERS_STARTED },
            { type: types.DELETE_CUSTOMERS_FAILURE, payload: ['uzgorod', 'dnipro'] }   
        ]
    
        return store.dispatch(actions.deleteCustomersFromDB({}))
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
//         fetchMock.mock('/api/orders/freeMasters', {
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