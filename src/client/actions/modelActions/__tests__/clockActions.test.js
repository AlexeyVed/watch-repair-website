import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../clockActions.js'
import * as types from '../../types.js'
import moxios from 'moxios'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Clock actions', () => {

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
            type: types.LOAD_CLOCKS_FAILURE,
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.loadClocksFailure(test.payload)).toEqual(test)
        })
    })

    it('should create an action load successes', () => {
        const data = ['cities', 'orders']
        const testValue = data.map(elem => ({
            type: types.LOAD_CLOCKS_SUCCESS,
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.loadClocksSuccess(test.payload)).toEqual(test)
        })
    })

    it('should create an action add failure', () => {
        const data = ['cities', 'orders']
        const testValue = data.map(elem => ({
            type: types.ADD_CLOCKS_FAILURE,
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.addClocksFailure(test.payload)).toEqual(test)
        })
    })

    it('should create an action delete failure', () => {
        const data = ['cities', 'orders']
        const testValue = data.map(elem => ({
            type: types.DELETE_CLOCKS_FAILURE,
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.deleteClocksFailure(test.payload)).toEqual(test)
        })
    })

    it('should create an action edit failure', () => {
        const data = ['cities', 'orders']
        const testValue = data.map(elem => ({
            type: types.EDIT_CLOCKS_FAILURE,
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.editClocksFailure(test.payload)).toEqual(test)
        })
    })

    it('should create an action add successes', () => {
        const data = ['cities', 'orders']
        const testValue = data.map(elem => ({
            type: types.ADD_CLOCKS_SUCCESS,
            message: 'Clock was successfully added.',
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.addClocksSuccess(test.payload)).toEqual(test)
        })
    })

    it('should create an action delete successes', () => {
        const data = ['cities', 'orders']
        const testValue = data.map(elem => ({
            type: types.DELETE_CLOCKS_SUCCESS,
            message: 'Clock was successfully removed.',
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.deleteClocksSuccess(test.payload)).toEqual(test)
        })
    })

    it('should create an action edit successes', () => {
        const data = ['cities', 'orders']
        const testValue = data.map(elem => ({
            type: types.EDIT_CLOCKS_SUCCESS,
            message: 'Clock was successfully edited.',
            payload: elem
        }))
        testValue.forEach(test => {
            expect(actions.editClocksSuccess(test.payload)).toEqual(test)
        })
    })

    it('Axios load clock success', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
              status: 200,
              response: ['uzgorod', 'dnipro'],
            })
        })

        const expectedActions = [
            { type: types.LOAD_CLOCKS_STARTED },
            { type: types.LOAD_CLOCKS_SUCCESS, payload: ['uzgorod', 'dnipro'] }   
        ]

        return store.dispatch(actions.loadClocks())
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
            { type: types.LOAD_CLOCKS_STARTED },
            { type: types.LOAD_CLOCKS_FAILURE, payload: ['uzgorod', 'dnipro'] }   
        ]

        return store.dispatch(actions.loadClocks())
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Axios addClockToDB success', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 201,
            response: ['uzgorod'],
            })
        })
    
        const expectedActions = [
            { type: types.ADD_CLOCKS_STARTED },
            { type: types.ADD_CLOCKS_SUCCESS, message: 'Clock was successfully added.', payload: ['uzgorod'] },
            { type: types.REDIRECT_FROM_REFACTOR }   
        ]
   
        return store.dispatch(actions.addClockToDB({}))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    
    it('Axios addClockToDB failure', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 404,
            response: ['uzgorod', 'dnipro'],
            })
        })
        
        const expectedActions = [
            { type: types.ADD_CLOCKS_STARTED },
            { type: types.ADD_CLOCKS_FAILURE, payload: ['uzgorod', 'dnipro'] }   
        ]
    
        return store.dispatch(actions.addClockToDB({}))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Axios editClockIntoDB success', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 201,
            response: ['uzgorod'],
            })
        })
    
        const expectedActions = [
            { type: types.EDIT_CLOCKS_STARTED },
            { type: types.EDIT_CLOCKS_SUCCESS, message: 'Clock was successfully edited.', payload: ['uzgorod'] },
            { type: types.REDIRECT_FROM_REFACTOR }   
        ]
   
        return store.dispatch(actions.editClockIntoDB({}))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    
    it('Axios editClockIntoDB failure', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 404,
            response: ['uzgorod', 'dnipro'],
            })
        })
        
        const expectedActions = [
            { type: types.EDIT_CLOCKS_STARTED },
            { type: types.EDIT_CLOCKS_FAILURE, payload: ['uzgorod', 'dnipro'] }   
        ]
    
        return store.dispatch(actions.editClockIntoDB({}))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Axios deleteClockFromDB success', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 201,
            response: ['uzgorod'],
            })
        })
    
        const expectedActions = [
            { type: types.DELETE_CLOCKS_STARTED },
            { type: types.DELETE_CLOCKS_SUCCESS, message: 'Clock was successfully removed.', payload: ['uzgorod'] } 
        ]
   
        return store.dispatch(actions.deleteClockFromDB({}))
        .then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
    
    it('Axios deleteClockFromDB failure', () => {
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
            status: 404,
            response: ['uzgorod', 'dnipro'],
            })
        })
        
        const expectedActions = [
            { type: types.DELETE_CLOCKS_STARTED },
            { type: types.DELETE_CLOCKS_FAILURE, payload: ['uzgorod', 'dnipro'] }   
        ]
    
        return store.dispatch(actions.deleteClockFromDB({}))
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