import React from 'react'
import { ModuleRefactorCities, mapDispatchToProps, mapStateToProps } from './RefactorCities.jsx'
import { MemoryRouter } from 'react-router'
import configureMockStore from 'redux-mock-store'

describe('Testing admin table cities', () => {

    test('Render table cities', () => {
        let count = 1
        const cities = []
        while (count <= 14 ) {
            cities.push({
                id: count,
                city: "Some city"
            })
            count++
        }
        const page1 = document.createElement('div')
        const page2 = document.createElement('div')
        page1.setAttribute('id', '1')
        page2.setAttribute('id', '2')
        let pages = [ page1, page2 ]

   
        const spy = sinon.spy()

        const wrapper = mount(
            <MemoryRouter initialEntries={[ { pathname: '/admin/cities', key: 'testKey' } ]}>
                <ModuleRefactorCities
                testPages = { pages }
                deleteCity = { spy }
                loadCities = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadEnd = { jest.fn() }
                setPage = { jest.fn() }
                cities = { cities }/>
            </MemoryRouter>
        )
        expect(wrapper).toMatchSnapshot()
        wrapper.find('.page').last().simulate('click')
        wrapper.find('.page').first().simulate('click')
        wrapper.find('.page').last().simulate('click')
        expect(wrapper).toMatchSnapshot()
        wrapper.find('.bttn-delete-city').last().simulate('click')
        expect(spy.calledOnce).toBe(true)
    })

    // test('Click delete button', () => {
    //     let count = 1
    //     const cities = []
    //     while (count <= 13 ) {
    //         cities.push({
    //             id: count,
    //             city: "Some city"
    //         })
    //         count++
    //     }
    //     const mockStore = configureMockStore()
    //     const store = mockStore({})
    //     const spy = sinon.spy()
   
    //     const wrapper = mount(
    //         <MemoryRouter initialEntries={[ { pathname: '/admin/cities/add', key: 'testKey' } ]}>
    //             <ModuleRefactorCities
    //             store = { store }
    //             deleteCity = { spy }
    //             loadCities = { () => {
    //                 return new Promise( (res, rej) => {
    //                     true ? res('true') : rej('false')
    //                 })
    //             } }
    //             loadEnd = { jest.fn() }
    //             setPage = { jest.fn() }
    //             cities = { cities }/>
    //         </MemoryRouter>
    //     )
        
    //     expect(wrapper.find('.add-city')).toHaveLength(1)
    // })

    test('Testing map dispatch to props', () => {
        const test = mapDispatchToProps(jest.fn())
        expect(Object.keys(test)).toContain('deleteCity')
        expect(Object.keys(test)).toContain('loadCities')
        expect(Object.keys(test)).toContain('loadEnd')
        expect(Object.keys(test)).toContain('setPage')
    })

    test('Testing map state to props', () => {
        const initialState = {
            cityReducer: {
                data: []
            }
        }
        const test = mapStateToProps(initialState)
        const expected = {
            cities: []
        }
        expect(test).toEqual(expected)
    })
})
