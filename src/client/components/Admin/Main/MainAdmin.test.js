import React from 'react'
import { ModuleMainAdmin } from './MainAdmin.jsx'

test('Render main admin', () => {
    const wrapper = shallow(
        <ModuleMainAdmin/>
    )
    expect(wrapper).toMatchSnapshot();
})