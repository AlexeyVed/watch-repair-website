import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Button from '@material-ui/core/Button'
import CustomTooltip from '../../ComponentMaterial/TooltipOrder'
import PoratlOrders from '../../ComponentMaterial/PortalOrdersInDate'
import { format } from 'date-fns'
import { connect } from 'react-redux'

import { loadForDashboard, loadDataEnd, setPage } from '../../../actions'

import './Dashboard.less'

class Dashboard extends React.Component {
  state = {
    year: new Date().getFullYear(),
    month: new Date().getMonth()
  }

  getDay = date => {
    let day = date.getDay()
    if (day === 0) day = 7
    return day - 1
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.month !== this.state.month || prevState.year !== this.state.year) {
      const string = this.state.month < 9 ? `${this.state.year}-0${this.state.month + 1}` : `${this.state.year}-${this.state.month + 1}`
      this.props.loadOrders(string)
        .then((res) => {
          this.props.loadEnd()
        })
    }
  }

  nextMonth = () => {
    if (this.state.month === 11) {
      return this.setState(() => ({ month: 0, year: this.state.year + 1 }))
    }
    this.setState(() => ({ month: this.state.month + 1 }))
  }

  previousMonth = () => {
    if (this.state.month === 0) {
      return this.setState(() => ({ month: 11, year: this.state.year - 1 }))
    }
    this.setState(() => ({ month: this.state.month - 1 }))
  }

  componentDidMount () {
    this.props.loadOrders(`${this.state.year}-${this.state.month + 1}`)
      .then((res) => {
        this.props.loadEnd()
      })
    this.props.setPage('board')
  }
  render () {
    const { getDay } = this
    const { orders } = this.props
    const { year, month } = this.state
    let date = new Date(year, month)
    const startBlanksReverse = []
    const endBlanks = []
    const daysInMonth = []

    const lastDayOfLastMonth = new Date(year, month)
    lastDayOfLastMonth.setDate(-1)
    let lastDay = lastDayOfLastMonth.getDate() + 1
    for (let i = 0; i < getDay(date); i++) {
      startBlanksReverse.push(<td className='calendar__calendar-body empty' onClick={this.previousMonth} key={`start-empty-${i}`}><div className='calendar__calendar-body__day'><span>{lastDay}</span></div></td>)
      lastDay--
    }

    const startBlanks = startBlanksReverse.reverse()

    while (date.getMonth() === month) {
      const ordersInDate = []
      const numberDay = date.getDate()
      for (let order of orders) {
        if (format(new Date(order.date), 'MM-dd') === format(date, 'MM-dd')) {
          ordersInDate.push(order)
        }
      }
      let i = 0
      daysInMonth.push(<td key={`day-${numberDay}`}>
        <PoratlOrders orders={ordersInDate} day={numberDay} year={year} month={month}/>
        <div className='calendar__calendar-body__data'>
          <div className='calendar__calendar-body__day'>{numberDay}</div>
          {ordersInDate.map(order => {
            i++
            return <CustomTooltip
              num={i}
              master={order.master.name}
              time={order.time}
              duration={order.duration}
              city={order.city.name}
              clock={order.clock.name}
              customer={order.customer.name}
              key={`order-tooltip-${order.id}`}/>
          })}</div>
      </td>)
      date.setDate(numberDay + 1)
    }

    if (getDay(date) !== 0) {
      let j = 1
      for (let i = getDay(date); i < 7; i++) {
        endBlanks.push(<td className='calendar__calendar-body empty' onClick={this.nextMonth} key={`end-empty-${i}`}><div className='calendar__calendar-body__day'><span>{j}</span></div></td>)
        j++
      }
    }

    const totalSlots = [...startBlanks, ...daysInMonth, ...endBlanks]
    let cells = []
    let rows = []

    totalSlots.forEach((row, i) => {
      if (i % 7 !== 0) {
        cells.push(row)
      } else {
        rows.push(cells)
        cells = []
        cells.push(row)
      }
      if (i === totalSlots.length - 1) {
        rows.push(cells)
      }
    })
    let numberRows = 0
    let calendar = rows.map(row => {
      numberRows++
      return <TableRow className='calendar__calendar-body__row' key={`row-${numberRows}`}>{row}</TableRow>
    })

    return (
      <div className='dashboard'>
        <div className='dashboard__title-calendar'>
          <Button onClick={this.previousMonth}><ChevronLeftIcon/></Button>
          <div className='dashboard__title-calendar__text'>{ format(new Date(year, month), 'MMMM yyyy')}</div>
          <Button onClick={this.nextMonth}><ChevronRightIcon/></Button>
        </div>
        <Paper className='dashboard__calendar-background'>
          <Table className='calendar'>
            <TableHead>
              <TableRow className='calendar__week-title'>
                <TableCell className='calendar__week-title__day'>{window.innerWidth < 695 ? 'Mon' : 'Monday'} </TableCell>
                <TableCell className='calendar__week-title__day'>{window.innerWidth < 695 ? 'Tue' : 'Tuesday'}</TableCell>
                <TableCell className='calendar__week-title__day'>{window.innerWidth < 695 ? 'Wed' : 'Wednesday'}</TableCell>
                <TableCell className='calendar__week-title__day'>{window.innerWidth < 695 ? 'Thu' : 'Thursday'}</TableCell>
                <TableCell className='calendar__week-title__day'>{window.innerWidth < 695 ? 'Fri' : 'Friday'}</TableCell>
                <TableCell className='calendar__week-title__day'>{window.innerWidth < 695 ? 'Sat' : 'Saturday'}</TableCell>
                <TableCell className='calendar__week-title__day'>{window.innerWidth < 695 ? 'Sun' : 'Sunday'}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className='calendar__calendar-body'>
              { calendar }
            </TableBody>
          </Table>
        </Paper>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.dashboardData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadEnd: () => dispatch(loadDataEnd()),
    loadOrders: date => dispatch(loadForDashboard(date)),
    setPage: data => dispatch(setPage(data))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)
