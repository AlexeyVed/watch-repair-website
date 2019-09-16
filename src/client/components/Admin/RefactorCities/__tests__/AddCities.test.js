import React from 'react'
import { ModuleAddCities } from '../AddCities.jsx'

test('Render portal add cities', () => {
    const wrapper = shallow(
        <ModuleAddCities
        handleSubmit = { jest.fn() }
        addCity = { jest.fn() }/>
    )
    expect(wrapper).toMatchSnapshot();
})