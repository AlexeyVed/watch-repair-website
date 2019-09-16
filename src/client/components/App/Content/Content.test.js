import React from 'react'
import { ModuleContent } from './Content.jsx'

test('Render modal window', () => {
    const wrapper = shallow(
        <ModuleContent/>
    )
    expect(wrapper).toMatchSnapshot();
})
