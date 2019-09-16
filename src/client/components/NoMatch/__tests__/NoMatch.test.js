import NoMatch from '../NoMatch.jsx'

test('Render no match page', () => {
    const wrapper = shallow(
        NoMatch({location: 'something location'})
    )
    expect(wrapper).toMatchSnapshot();
})