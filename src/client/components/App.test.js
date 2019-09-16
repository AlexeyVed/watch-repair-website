import React from 'react'
import { ModuleApp } from './App.jsx'

test('App snapshots', () => {
const tree = shallow(
    <ModuleApp/>
  );

  expect(tree).toMatchSnapshot()
});