import React from 'react'
import { ModuleEditCities } from '../EditCities.jsx'
import moxios from 'moxios'

beforeEach(function () {
    moxios.install();
  })

  afterEach(function () {
    moxios.uninstall();
  })

test('Render portal edit cities', () => {
    const wrapper = shallow(
        <ModuleEditCities
        handleSubmit = { jest.fn() }
        editCity = { jest.fn() }
        location = { {pathname: 'some/path/1'} }/>
    )
    expect(wrapper).toMatchSnapshot();
})