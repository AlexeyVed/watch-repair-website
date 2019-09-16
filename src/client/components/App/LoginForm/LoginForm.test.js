import React from 'react'
import { ModuleLoginForm } from './LoginForm.jsx'

test('Render modal login form', () => {
    const wrapper = shallow(
        <ModuleLoginForm 
        loginApp = { jest.fn() }
        missLoginError = { jest.fn() }
        handleSubmit = { jest.fn() }/>
    )
    expect(wrapper).toMatchSnapshot();
})
