import React from 'react'
import { ModuleRefactorClients, mapDispatchToProps, mapStateToProps } from './RefactorClients.jsx'
import { MemoryRouter } from 'react-router'

describe('Testing admin table clients', () => {

    test('Render table clients', () => {

        let count = 1
        const customer = []
        while (count <= 12 ) {
            customer.push({
                id: count,
                name: 'Name',
                city: 'Cities'
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
            <MemoryRouter initialEntries={[ { pathname: '/admin/clients', key: 'testKey' } ]}>
                <ModuleRefactorClients
                testPages = { pages }
                deleteClient = { spy }
                loadClients = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadEnd = { jest.fn() }
                setPage = { jest.fn() }
                customers = { customer }/>
            </MemoryRouter>
        )
       
        expect(wrapper).toMatchSnapshot()
        wrapper.find('.page').last().simulate('click')
        wrapper.find('.page').first().simulate('click')
        wrapper.find('.page').last().simulate('click')
        expect(wrapper).toMatchSnapshot()
        wrapper.find('.bttn-delete-client').last().simulate('click')
        expect(spy.calledOnce).toBe(true)
    })

    test('Render modal add', () => {

        let count = 1
        const customer = []
        while (count <= 2 ) {
            customer.push({
                id: count,
                name: 'Name',
                city: 'Cities'
            })
            count++
        }
  
        const wrapper = mount(
            <MemoryRouter initialEntries={[ { pathname: '/admin/clients/add', key: 'testKey' } ]}>
                <ModuleRefactorClients
                deleteClient = { jest.fn() }
                loadClients = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadEnd = { jest.fn() }
                setPage = { jest.fn() }
                customers = { customer }
                testRender = { true }/>
            </MemoryRouter>
        )
       
        expect(wrapper).toMatchSnapshot()
    })

    test('Render modal edit', () => {

        let count = 1
        const customer = []
        while (count <= 2 ) {
            customer.push({
                id: count,
                name: 'Name',
                city: 'Cities'
            })
            count++
        }
  
        const wrapper = mount(
            <MemoryRouter initialEntries={[ { pathname: '/admin/clients/edit/1', key: 'testKey' } ]}>
                <ModuleRefactorClients
                deleteClient = { jest.fn() }
                loadClients = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadEnd = { jest.fn() }
                setPage = { jest.fn() }
                customers = { customer }
                testRender = { true }/>
            </MemoryRouter>
        )
        expect(wrapper).toMatchSnapshot()
    })

    test('Testing map dispatch to props', () => {
        const test = mapDispatchToProps(jest.fn())
        expect(Object.keys(test)).toContain('deleteClient')
        expect(Object.keys(test)).toContain('loadClients')
        expect(Object.keys(test)).toContain('loadEnd')
        expect(Object.keys(test)).toContain('setPage')
    })

    test('Testing map state to props', () => {
        const initialState = {
            customerReducer: {
                data: []
            }
        }
        const test = mapStateToProps(initialState)
        const expected = {
            customers: []
        }
        expect(test).toEqual(expected)
    })
})