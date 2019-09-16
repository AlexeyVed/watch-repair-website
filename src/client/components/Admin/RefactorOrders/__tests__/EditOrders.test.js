import React from 'react'
import { ModuleEditOrder } from '../EditOrder.jsx'
import moxios from 'moxios'

beforeEach(function () {
    moxios.install();
  })

  afterEach(function () {
    moxios.uninstall();
  })

test('Render portal edit orders', () => {
    const wrapper = shallow(
        <ModuleEditOrder
        handleSubmit = { jest.fn() }
        editOrder = { jest.fn() }
        location = { {pathname: 'some/path/1'} }
        chooseClock = { [] }
        chooseCities = { [] }
        chooseUsers = { [] }
        chooseWorkers = { [] }/>
    )
    expect(wrapper).toMatchSnapshot();
})