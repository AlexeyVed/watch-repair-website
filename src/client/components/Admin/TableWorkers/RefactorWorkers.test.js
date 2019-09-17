import React from 'react'
import { ModuleRefactorWorkers, mapDispatchToProps, mapStateToProps } from './RefactorWorkers.jsx'
import { MemoryRouter } from 'react-router'

describe('Render table masters', () => {

    test('Render table masters', () => {

        let count = 1
        const master = []
        while (count <= 12 ) {
            master.push({
                id: count,
                name: "Name",
                rating: 5,
                cityId: count,
                city: {
                    id: count,
                    city: "City"
                }
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
            <MemoryRouter initialEntries={[ { pathname: '/admin/workers', key: 'testKey' } ]}>
                <ModuleRefactorWorkers
                testPages = { pages }
                deleteWorker = { spy }
                loadWorkers = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadCities = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadEnd = { jest.fn() }
                setPage = { jest.fn() }
                workers = { master }/>
            </MemoryRouter>
        )
       
        expect(wrapper).toMatchSnapshot()
        wrapper.find('.page').last().simulate('click')
        wrapper.find('.page').first().simulate('click')
        wrapper.find('.page').last().simulate('click')
        expect(wrapper).toMatchSnapshot()
        wrapper.find('.bttn-delete-master').last().simulate('click')
        expect(spy.calledOnce).toBe(true)
    })

    test('Render modal add', () => {

        let count = 1
        const master = []
        while (count <= 2 ) {
            master.push({
                id: count,
                name: "Name",
                rating: 5,
                cityId: count,
                city: null
            })
            count++
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={[ { pathname: '/admin/workers/add', key: 'testKey' } ]}>
                <ModuleRefactorWorkers
                deleteWorker = { jest.fn() }
                loadWorkers = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadCities = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadEnd = { jest.fn() }
                setPage = { jest.fn() }
                workers = { master }
                testRender = { true }/>
            </MemoryRouter>
        )
       
        expect(wrapper).toMatchSnapshot()
    })

    test('Render modal edit', () => {

        let count = 1
        const master = []
        while (count <= 2 ) {
            master.push({
                id: count,
                name: "Name",
                rating: 5,
                cityId: count,
                city: {
                    id: count,
                    city: "City"
                }
            })
            count++
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={[ { pathname: '/admin/workers/edit/1', key: 'testKey' } ]}>
                <ModuleRefactorWorkers
                deleteWorker = { jest.fn() }
                loadWorkers = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadCities = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadEnd = { jest.fn() }
                setPage = { jest.fn() }
                workers = { master }
                testRender = { true }/>
            </MemoryRouter>
        ) 
        expect(wrapper).toMatchSnapshot()
    })

    test('Testing map dispatch to props', () => {
        const test = mapDispatchToProps(jest.fn())
        expect(Object.keys(test)).toContain('deleteWorker')
        expect(Object.keys(test)).toContain('loadWorkers')
        expect(Object.keys(test)).toContain('loadCities')
        expect(Object.keys(test)).toContain('loadEnd')
        expect(Object.keys(test)).toContain('setPage')
    })

    test('Testing map state to props', () => {
        const initialState = {
            masterReducer: {
                data: []
            }
        }
        const test = mapStateToProps(initialState)
        const expected = {
            workers: []
        }
        expect(test).toEqual(expected)
    })
})
