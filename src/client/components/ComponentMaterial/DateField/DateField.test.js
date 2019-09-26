import DateField from './index.jsx'

test('Date field material', () => {
  const wrapper = shallow(
    DateField({ input: { value: '2019-11-11' }, label: 'Choose', min: '2000-11-11', max: '2022-11-11' })
  )
  expect(wrapper).toMatchSnapshot()
})

test('Date field material', () => {
  const wrapper = mount(
    DateField({ input: { value: '2019-11-11', onChange: date => date }, label: 'Choose', min: '2000-11-11', max: '2022-11-11' })
  )
  wrapper.find('#date-picker-dialog').first().prop('onChange')(new Date('2019-11-12'))
  expect(wrapper).toMatchSnapshot()
  wrapper.find('#date-picker-dialog').first().prop('onChange')(null)
  wrapper.update()
  expect(wrapper).toMatchSnapshot()
})
