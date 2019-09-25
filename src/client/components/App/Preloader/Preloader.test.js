import Preloader from './Preloader.jsx'
import React from 'react'

test('Render preloader', () => {
    const wrapper = shallow(
        <Preloader/>
    )
    expect(wrapper).toMatchSnapshot();
})