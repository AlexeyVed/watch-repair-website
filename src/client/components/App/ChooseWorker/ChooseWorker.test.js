import React from 'react'
import { ModuleChooseWorker, mapStateToProps, mapDispatchToProps } from './ChooseWorker.jsx'
import mockAxios from 'jest-mock-axios'
// import configureMockStore from 'redux-mock-store'

describe('Testing snapshots', () => {
    afterEach(() => {
        mockAxios.reset();
    })
    
    test('Render table choose masters', () => {
        const wrapper = shallow(
            <ModuleChooseWorker
            handleSubmit = { jest.fn() }
            setWorker = { jest.fn() }
            addOrder = { jest.fn() }
            returnHomePage = { jest.fn() }
            order = { [] }
            workers = { [] }/>
        )
        expect(wrapper).toMatchSnapshot();
    })
    
    test('Render table choose masters', () => {
        const masters = [
            {
                id: 1,
                name: "Sergey",
                rating: 5,
                cityId: 1,
                city: {
                    id: 1,
                    city: "Dnipro"
                }
            },
            {
                id: 2,
                name: "Nickolay",
                rating: 4,
                cityId: null,
                city: null
            }
        ]
    
        const spyChoose = sinon.spy()
        const spyConfirm = sinon.spy()
    
        const wrapper = shallow(
            <ModuleChooseWorker
            handleSubmit = { jest.fn() }
            setWorker = { spyChoose }
            addOrder = { spyConfirm }
            returnHomePage = { jest.fn() }
            order = { [] }
            workers = { masters }
            masterId = { 1 }
            chooseMaster = { true }/>
        )
        wrapper.find('.choose-worker__table__worker').first().simulate("click")
        expect(spyChoose.calledOnce).toBe(true)
        wrapper.find('[alt="buttonConf"]').first().simulate("click")
        expect(spyConfirm.calledOnce).toBe(true)
    
    })
})

// describe('Testing redux connection', () => {
//     const mockStore = configureMockStore()
//     let store, wrapper

//     beforeEach(() => {
//         store = mockStore(initialState);
//         wrapper = shallow(
//             <ChooseWorker store={ store } />
//         )
//     })

//     test('Test redux connections mapStateToProps', () => {  not working in coverate
//         const props =  wrapper.props().children.props
//         expect(props.workers).toEqual([])
//         expect(props.masterId).toEqual(null)
//         expect(props.order).toEqual({})
//         expect(props.chooseMaster).toEqual(null)
//     })

//     test('Test redux connections mapStateToProps', () => {
//         const initialState = {
//             appReducer: {
//                 forOrder: {
//                     freeWorkers: [],
//                     masterId: null,
//                     order: {},
//                 },
//                 chooseWorker: null
//             }
//         }
//         expect(mapStateToProps(initialState).workers).toEqual([])
//         expect(mapStateToProps(initialState).masterId).toEqual(null)
//         expect(mapStateToProps(initialState).order).toEqual({})
//         expect(mapStateToProps(initialState).chooseMaster).toEqual(null)
//     })  
// })
