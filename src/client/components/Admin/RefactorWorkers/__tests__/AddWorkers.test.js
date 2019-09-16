import React from 'react'
import { ModuleAddWorkers } from '../AddWorkers.jsx'

test('Render portal add workers', () => {
    const wrapper = shallow(
        <ModuleAddWorkers
        handleSubmit = { jest.fn() }
        addWorker = { jest.fn() }
        chooseCities = { [] }/>
    )
    expect(wrapper).toMatchSnapshot();
})