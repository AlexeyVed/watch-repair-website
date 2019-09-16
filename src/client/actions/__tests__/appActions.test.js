import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as actions from '../appActions.js'
import * as types from '../types.js'

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