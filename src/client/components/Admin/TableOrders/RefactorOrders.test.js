import React from 'react'
import { ModuleRefactorOrders, mapDispatchToProps, mapStateToProps } from './RefactorOrders.jsx'
import { MemoryRouter } from 'react-router'

describe('Render table orders', () => {

    test('Render table orders', () => {

        let count = 1
        const order = []
        while (count <= 12 ) {
            order.push({
                id: count,
                date: "2019-09-10",
                time: 9,
                customerId: count,
                clockId: count,
                cityId: count,
                masterId: count,
                customer: {
                    id: count,
                    name: "Name",
                    email: "email@email.com"
                },
                clock: {
                    id: count,
                    typeClock: "Type",
                    timeRepair: count
                },
                city: {
                    id: count,
                    city: "City"
                },
                master: {
                    id: count,
                    name: "Name",
                    rating: 5,
                    cityId: count
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
            <MemoryRouter initialEntries={[ { pathname: '/admin/orders', key: 'testKey' } ]}>
                <ModuleRefactorOrders
                testPages = { pages }
                deleteOrder = { spy }
                loadOrders = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
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
                loadClocks = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadClients = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadEnd = { jest.fn() }
                setPage = { jest.fn() }
                orders = { order }/>
            </MemoryRouter>
        )
       
        expect(wrapper).toMatchSnapshot()
        wrapper.find('.page').last().simulate('click')
        wrapper.find('.page').first().simulate('click')
        wrapper.find('.page').last().simulate('click')
        expect(wrapper).toMatchSnapshot()
        wrapper.find('.bttn-delete-order').last().simulate('click')
        expect(spy.calledOnce).toBe(true)
    })

    test('Render modal add', () => {

        let count = 1
        const order = []
        while (count <= 2 ) {
            order.push({
                id: count,
                date: "2019-09-10",
                time: 9,
                customerId: count,
                clockId: count,
                cityId: count,
                masterId: count,
                customer: {
                    id: count,
                    name: "Name",
                    email: "email@email.com"
                },
                clock: {
                    id: count,
                    typeClock: "Type",
                    timeRepair: count
                },
                city: {
                    id: count,
                    city: "City"
                },
                master: {
                    id: count,
                    name: "Name",
                    rating: 5,
                    cityId: count
                }
            })
            count++
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={[ { pathname: '/admin/orders/add', key: 'testKey' } ]}>
                <ModuleRefactorOrders
                deleteOrder = { jest.fn() }
                loadOrders = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
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
                loadClocks = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadClients = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadEnd = { jest.fn() }
                setPage = { jest.fn() }
                orders = { order }
                testRender = { true }/>
            </MemoryRouter>
        )
       
        expect(wrapper).toMatchSnapshot()
    })

    test('Render modal add', () => {

        let count = 1
        const order = []
        while (count <= 2 ) {
            order.push({
                id: count,
                date: "2019-09-10",
                time: 9,
                customerId: count,
                clockId: count,
                cityId: count,
                masterId: count,
                customer: null,
                clock: null,
                city: null,
                master: null
            })
            count++
        }
        
        const wrapper = mount(
            <MemoryRouter initialEntries={[ { pathname: '/admin/orders/edit/1', key: 'testKey' } ]}>
                <ModuleRefactorOrders
                deleteOrder = { jest.fn() }
                loadOrders = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
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
                loadClocks = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadClients = { () => {
                    return new Promise( (res, rej) => {
                        true ? res('true') : rej('false')
                    })
                } }
                loadEnd = { jest.fn() }
                setPage = { jest.fn() }
                orders = { order }
                testRender = { true }/>
            </MemoryRouter>
        )
       
        expect(wrapper).toMatchSnapshot()
    })

    test('Testing map dispatch to props', () => {
        const test = mapDispatchToProps(jest.fn())
        expect(Object.keys(test)).toContain('deleteOrder')
        expect(Object.keys(test)).toContain('loadOrders')
        expect(Object.keys(test)).toContain('loadWorkers')
        expect(Object.keys(test)).toContain('loadCities')
        expect(Object.keys(test)).toContain('loadClocks')
        expect(Object.keys(test)).toContain('loadClients')
        expect(Object.keys(test)).toContain('loadEnd')
        expect(Object.keys(test)).toContain('setPage')
    })

    test('Testing map state to props', () => {
        const initialState = {
            orderReducer: {
                data: []
            }
        }
        const test = mapStateToProps(initialState)
        const expected = {
            orders: []
        }
        expect(test).toEqual(expected)
    })
})
