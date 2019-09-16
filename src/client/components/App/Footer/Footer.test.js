import Footer from './Footer.jsx'

test('Render footer', () => {
    const wrapper = shallow(
        Footer()
    )
    expect(wrapper).toMatchSnapshot();
})
