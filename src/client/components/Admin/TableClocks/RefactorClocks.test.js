import React from 'react'
import { ModuleRefactorClocks, mapDispatchToProps, mapStateToProps } from './RefactorClocks.jsx'
import { MemoryRouter } from 'react-router'

describe('Testing admin table clocks', () => {

    test('Render table clock', () => {

        let count = 1
        const clock = []
        while (count <= 12 ) {
            clock.push({
                id: count,
                typeClock: 'Type',
                timeRepair: count
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
            <MemoryRouter initialEntries={[ { pathname: '/admin/clocks', key: 'testKey' } ]}>
                <ModuleRefactorClocks
                testPages = { pages }
                deleteClock = { spy }
                loadClocks = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadEnd = { jest.fn() }
                setPage = { jest.fn() }
                clocks = { clock }/>
            </MemoryRouter>
        )
       
        expect(wrapper).toMatchSnapshot()
        wrapper.find('.page').last().simulate('click')
        wrapper.find('.page').first().simulate('click')
        wrapper.find('.page').last().simulate('click')
        expect(wrapper).toMatchSnapshot()
        wrapper.find('.bttn-delete-clock').last().simulate('click')
        expect(spy.calledOnce).toBe(true)
    })

    test('Render modal add', () => {

        let count = 1
        const clock = []
        while (count <= 2 ) {
            clock.push({
                id: count,
                typeClock: 'Type',
                timeRepair: count
            })
            count++
        }
   
        const wrapper = mount(
            <MemoryRouter initialEntries={[ { pathname: '/admin/clocks/add', key: 'testKey' } ]}>
                <ModuleRefactorClocks
                deleteClock = { jest.fn() }
                loadClocks = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadEnd = { jest.fn() }
                setPage = { jest.fn() }
                clocks = { clock }
                testRender = { true }/>
            </MemoryRouter>
        )
       
        expect(wrapper).toMatchSnapshot()
    })

    test('Render modal edit', () => {

        let count = 1
        const clock = []
        while (count <= 2 ) {
            clock.push({
                id: count,
                typeClock: 'Type',
                timeRepair: count
            })
            count++
        }
   
        const wrapper = mount(
            <MemoryRouter initialEntries={[ { pathname: '/admin/clocks/edit/1', key: 'testKey' } ]}>
                <ModuleRefactorClocks
                deleteClock = { jest.fn() }
                loadClocks = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadEnd = { jest.fn() }
                setPage = { jest.fn() }
                clocks = { clock }
                testRender = { true }/>
            </MemoryRouter>
        )
        expect(wrapper).toMatchSnapshot()
    })

    test('Testing map dispatch to props', () => {
        const test = mapDispatchToProps(jest.fn())
        expect(Object.keys(test)).toContain('deleteClock')
        expect(Object.keys(test)).toContain('loadClocks')
        expect(Object.keys(test)).toContain('loadEnd')
        expect(Object.keys(test)).toContain('setPage')
    })

    test('Testing map state to props', () => {
        const initialState = {
            clockReducer: {
                data: []
            }
        }
        const test = mapStateToProps(initialState)
        const expected = {
            clocks: []
        }
        expect(test).toEqual(expected)
    })
})