import React from 'react'
import { ModuleMainOrder } from './MainOrder.jsx'

test('Render main order', () => {
    const wrapper = shallow(
        <ModuleMainOrder 
        loadCities = { jest.fn() }
        loadClocks = { jest.fn() }
        loadEnd = { jest.fn() }/>
    )
    expect(wrapper).toMatchSnapshot();
})
