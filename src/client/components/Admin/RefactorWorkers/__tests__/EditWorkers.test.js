import React from 'react'
import { ModuleEditWorkers } from '../EditWorkers.jsx'
import moxios from 'moxios'

beforeEach(function () {
    moxios.install();
  })

  afterEach(function () {
    moxios.uninstall();
  })

test('Render portal edit workers', () => {
    const wrapper = shallow(
        <ModuleEditWorkers
        handleSubmit = { jest.fn() }
        editWorker = { jest.fn() }
        location = { {pathname: 'some/path/1'} }
        chooseCities = { [] }/>
    )
    expect(wrapper).toMatchSnapshot();
})