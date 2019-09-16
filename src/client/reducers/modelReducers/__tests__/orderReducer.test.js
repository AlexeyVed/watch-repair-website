import reducer from '../orderReducer.js'
import * as types from '../../../actions/types.js'


const initialState = {
    data: [],
    error: null,
    redirectBackFromRefactor: false,
    refactorModelInProcess: false,
    showModal: false,
    message: null,
    dataLoad: false
}

describe('Order reducer', () => {

    test('should load orders started', () => {
        const action = {
            type: types.LOAD_ORDERS_STARTED
        }
        expect(reducer(initialState, action)
        ).toEqual({
            ...initialState,
            dataLoad: true
        })
    })

    test('should load orders success', () => {
        const action = {
            type: types.LOAD_ORDERS_SUCCESS,
            payload: 'data'
        }
        expect(reducer(initialState, action)
        ).toEqual({
            ...initialState,
            data: action.payload
        })
    })

    test('should load orders failure', () => {
        const action = {
            type: types.LOAD_ORDERS_FAILURE,
            payload: 'error'
        }
        expect(reducer(initialState, action)
        ).toEqual({
            ...initialState,
            showModal: true,
            error: action.payload
        })
    })

    test('should add orders failure', () => {
        const action = {
            type: types.ADD_ORDERS_FAILURE,
            payload: 'error'
        }
        expect(reducer(initialState, action)
        ).toEqual({
            ...initialState,
            showModal: true,
            error: action.payload
        })
    })

    test('should add orders started', () => {
        const action = {
            type: types.ADD_ORDERS_STARTED
        }
        expect(reducer(initialState, action)
        ).toEqual({
            ...initialState,
            refactorModelInProcess: true
        })
    })

    test('should add orders success', () => {
        const action = {
            type: types.ADD_ORDERS_SUCCESS,
            payload: 'orders',
            message: 'hello'
        }
        expect(reducer(initialState, action)
        ).toEqual({
            ...initialState,
            data: [
                ...initialState.data,
                action.payload
            ],
            redirectBackFromRefactor: true,
            showModal: true,
            message: action.message
        })
    })

    test('should edit orders started', () => {
        const action = {
            type: types.EDIT_ORDERS_STARTED
        }
        expect(reducer(initialState, action)
        ).toEqual({
            ...initialState,
            refactorModelInProcess: true
        })
    })

    test('should edit orders failure', () => {
        const action = {
            type: types.EDIT_ORDERS_FAILURE,
            payload: 'error'
        }
        expect(reducer(initialState, action)
        ).toEqual({
            ...initialState,
            error: action.payload,
            showModal: true
        })
    })

    test('should edit orders successes', () => {
        const action = {
            type: types.EDIT_ORDERS_SUCCESS,
            payload: { id: 1, city: 'orders'},
            message: 'hello'
        }
        expect(reducer({ ...initialState, data: [ { id: 1, city: 'orders'}, { id: 2, city: 'Dnipro'} ] }, action)
        ).toEqual({
            ...initialState,
            data: { ...initialState, data: [ { id: 1, city: 'orders'}, { id: 2, city: 'Dnipro'} ] }.data.map(city => {
                if (city.id === Number(action.payload.id)) {
                  action.payload.id = Number(action.payload.id)
                  return action.payload
                }
                return city
              }),
              redirectBackFromRefactor: true,
              showModal: true,
              message: action.message
        })
    })

    test('should delete orders failure', () => {
        const action = {
            type: types.DELETE_ORDERS_FAILURE,
            payload: 'error'
        }
        expect(reducer(initialState, action)
        ).toEqual({
            ...initialState,
            error: action.payload,
            showModal: true
        })
    })

    test('should delete orders started', () => {
        const action = {
            type: types.DELETE_ORDERS_STARTED
        }
        expect(reducer(initialState, action)
        ).toEqual({
            ...initialState,
            refactorModelInProcess: true
        })
    })

    test('should delete orders success', () => {
        const action = {
            type: types.DELETE_ORDERS_SUCCESS,
            payload: 1,
            message: 'hello'
        }
        expect(reducer({ ...initialState, data: [{id: 1}]}, action)
        ).toEqual({
            ...initialState,
            data: { ...initialState, data: [{id: 1}]}.data.filter(el => el.id !== +action.payload),
            refactorModelInProcess: false,
            showModal: true,
            message: action.message
        })
    })

    test('should redirect from refactor', () => {
        const action = {
            type: types.REDIRECT_FROM_REFACTOR
        }
        expect(reducer(initialState, action)
        ).toEqual({
            ...initialState,
            redirectBackFromRefactor: false
        })
    })

    test('should miss errors', () => {
        const action = {
            type: types.MISS_ERRORS
        }
        expect(reducer(initialState, action)
        ).toEqual({
            ...initialState,
            error: null,
            showModal: false,
            message: null
        })
    })

    test('should miss errors', () => {
        const action = {
            type: types.END_LOAD_DATA
        }
        expect(reducer(initialState, action)
        ).toEqual({
            ...initialState,
            dataLoad: false
        })
    })
})  