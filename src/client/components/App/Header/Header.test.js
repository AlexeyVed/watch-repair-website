import React from 'react'
import { ModuleHeader } from './Header.jsx'

test('Render header', () => {
    const wrapper = shallow(
        <ModuleHeader/>
    )
    expect(wrapper).toMatchSnapshot();
})
