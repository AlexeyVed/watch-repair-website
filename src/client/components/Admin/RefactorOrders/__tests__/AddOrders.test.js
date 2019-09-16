import React from 'react'
import { ModuleAddOrder } from '../AddOrder.jsx'

test('Render portal add orders', () => {
    const wrapper = shallow(
        <ModuleAddOrder
        handleSubmit = { jest.fn() }
        addOrder = { jest.fn() }
        chooseClock = { [] }
        chooseCities = { [] }
        chooseUsers = { [] }
        chooseWorkers = { [] }
        dispatch = { jest.fn() }/>
    )
    expect(wrapper).toMatchSnapshot();
})