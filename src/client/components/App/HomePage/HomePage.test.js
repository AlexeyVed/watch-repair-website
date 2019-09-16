import HomePage from './HomePage.jsx'

test('Render home page', () => {
    const wrapper = shallow(
        HomePage()
    )
    expect(wrapper).toMatchSnapshot();
})
