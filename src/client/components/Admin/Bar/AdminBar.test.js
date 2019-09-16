import { ModuleAdminBar } from './AdminBar.jsx'
import React from 'react'
import TestRenderer from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'

describe('Admin Bar', () => {
    test('Render admin bar', () => {
        const wrapper = shallow(  
            <ModuleAdminBar/>
        )
        expect(wrapper).toMatchSnapshot();
    })

    test('Render admin bar', () => {
        const wrapper = TestRenderer.create(
            <BrowserRouter>
                <ModuleAdminBar/>
            </BrowserRouter>
        )

        const JSONwrapper = wrapper.toJSON()
        wrapper.update(<BrowserRouter>
            <ModuleAdminBar page = 'cities'/>
        </BrowserRouter>)
        expect(wrapper.toJSON()).not.toEqual(JSONwrapper);
    })
})
