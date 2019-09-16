import React from 'react'
import { ModuleAddClocks } from '../AddClocks.jsx'

test('Render portal add clocks', () => {
    const wrapper = shallow(
        <ModuleAddClocks
        handleSubmit = { jest.fn() }
        addClock = { jest.fn() }/>
    )
    expect(wrapper).toMatchSnapshot();
})