import { ModuleAdminBar } from './AdminBar.jsx'
import React from 'react'
import TestRenderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'

describe('Admin Bar', () => {
    test('Render admin bar', () => {
        const wrapper = shallow(  
            <ModuleAdminBar/>
        )
        expect(wrapper).toMatchSnapshot();
    })

    test('Render admin bar', () => {
        const wrapper = TestRenderer.create(
            <MemoryRouter>
                <ModuleAdminBar/>
            </MemoryRouter>
        )

        const JSONwrapper = wrapper.toJSON()
        wrapper.update(<MemoryRouter>
            <ModuleAdminBar page = 'cities'/>
        </MemoryRouter>)
        expect(wrapper.toJSON()).not.toEqual(JSONwrapper);
    })
})
