import React from 'react'
import { ModuleRefactorOrders } from './RefactorOrders.jsx'

test('Render table orders', () => {
    const order = [
        {
            id: 1,
            date: "2019-09-10",
            time: 17,
            customerId: 2,
            clockId: 2,
            cityId: 1,
            masterId: 1,
            customer: {
                id: 2,
                name: "Sergey",
                email: "sergey@email.com"
            },
            clock: {
                id: 2,
                typeClock: "Medium",
                timeRepair: 2
            },
            city: {
                id: 1,
                city: "Dnipro"
            },
            master: {
                id: 1,
                name: "Sergey",
                rating: 5,
                cityId: 1
            }
        }
    ]
    const mockPromise = () => {
        return new Promise( (res, rej) => {
            true ? res('true') : rej('false')
        })
    }
    const wrapper = shallow(
        <ModuleRefactorOrders
        deleteOrder = { jest.fn() }
        loadOrders = { mockPromise } 
        loadWorkers = { mockPromise } 
        loadCities = { mockPromise } 
        loadClocks = { mockPromise } 
        loadClients = { mockPromise } 
        loadEnd = { jest.fn() }
        setPage = { jest.fn() }
        orders = { order }/>
    )
    expect(wrapper).toMatchSnapshot();
})