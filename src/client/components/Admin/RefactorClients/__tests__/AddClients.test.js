import React from 'react'
import { ModuleAddClients } from '../AddClients.jsx'

test('Render portal add clients', () => {
    const wrapper = shallow(
        <ModuleAddClients
        handleSubmit = { jest.fn() }
        addUser = { jest.fn() }/>
    )
    expect(wrapper).toMatchSnapshot();
})