import React from 'react'
import { ModuleEditClocks } from '../EditClocks.jsx'
import moxios from 'moxios'

beforeEach(function () {
    moxios.install();
  })

  afterEach(function () {
    moxios.uninstall();
  })

test('Render portal edit clocks', () => {
    const wrapper = shallow(
        <ModuleEditClocks
        handleSubmit = { jest.fn() }
        editClock = { jest.fn() }
        location = { {pathname: 'some/path/1'} }/>
    )
    expect(wrapper).toMatchSnapshot();
})