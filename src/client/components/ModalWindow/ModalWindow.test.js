import React from 'react'
import { ModuleWindowApp } from './ModalWindowApp.jsx'
import { ModuleWindowAdmin } from './ModalWindowAdmin.jsx'

test('Render modal window', () => {
    const wrapper = shallow(
        <ModuleWindowApp/>
    )
    expect(wrapper).toMatchSnapshot();
})

test('Render modal window admin', () => {
    const wrapper = shallow(
        <ModuleWindowAdmin/>
    )
    expect(wrapper).toMatchSnapshot();
})
