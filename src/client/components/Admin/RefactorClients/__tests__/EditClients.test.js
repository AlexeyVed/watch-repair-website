import React from 'react'
import { ModuleEditClients } from '../EditClients.jsx'
import moxios from 'moxios'

beforeEach(function () {
    moxios.install();
  })

  afterEach(function () {
    moxios.uninstall();
  })


test('Render portal edit clients', () => {
    const wrapper = shallow(
        <ModuleEditClients
        handleSubmit = { jest.fn() }
        editClient = { jest.fn() }
        location = { {pathname: 'some/path/1'} }/>
    )
    expect(wrapper).toMatchSnapshot();
})