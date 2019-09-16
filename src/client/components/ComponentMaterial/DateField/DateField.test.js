import DateField from './index.jsx'

test('Date field material', () => {
    const wrapper = shallow(
        DateField({ input: { value: '2019-11-11'}, label: 'Choose', min: '2000-11-11', max: '2022-11-11' })
    )
    expect(wrapper).toMatchSnapshot();
})