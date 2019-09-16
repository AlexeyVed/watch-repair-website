import React from 'react'
import { ModuleRefactorClients } from './RefactorClients.jsx'

test('Render table clients', () => {

    const cutomer = [
        {
            id: 3,
            name: "Alexey",
            email: "admin@example.com"
        },
        {
            id: 1,
            name: "Alexey",
            email: "alexey@gmail.com"
        },
        {
            id: 2,
            name: "Sergey",
            email: "sergey@email.com"
        }
    ]
    const wrapper = shallow(
        <ModuleRefactorClients
        deleteClient = { jest.fn() }
        loadClients = { () => {
            return new Promise( (res, rej) => {
                true ? res('true') : rej('false')
            })
        } }
        loadEnd = { jest.fn() }
        setPage = { jest.fn() }
        customers = { cutomer }/>
    )
    expect(wrapper).toMatchSnapshot();
})