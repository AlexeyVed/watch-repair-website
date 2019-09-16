import React from 'react'
import LinkButton from './LinkButton.jsx'

test('Render link button', () => {
    const wrapper = shallow(
        <LinkButton
            to='link/to'
            className='button-to'
            name='Button'
        />
    )
    expect(wrapper).toMatchSnapshot();
})