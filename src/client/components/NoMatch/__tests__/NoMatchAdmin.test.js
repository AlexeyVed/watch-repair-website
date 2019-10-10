import NoMatchAdmin from '../NoMatchAdmin'

test('Render lno match page', () => {
  const wrapper = shallow(
    NoMatchAdmin({ location: 'something location' })
  )
  expect(wrapper).toMatchSnapshot()
})
