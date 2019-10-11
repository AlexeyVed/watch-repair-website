import React from 'react';
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { format } from 'date-fns'
import { connect } from 'react-redux'

import './Dashboard.less'

class Dashboard extends React.Component {
  state = {
    year: 2019,
    month: 10
  }

  getDay = date => {
    let day = date.getDay()
    if (day === 0) day = 7
    return day - 1
  }

  render () {
    const { getDay } = this
    const { orders } = this.props
    const { year, month } = this.state
    let date = new Date(year, month)
    console.log(date)
    const startBlanks = []
    const endBlanks = []
    const daysInMonth = []

    for (let i = 0; i < getDay(date); i++) {
      startBlanks.push(<td className='calendar-day start-empty' key={`start-empty-${i}`}>{''}</td>)
    }

    while (date.getMonth() === month) {
      const ordersInDate = []
      const numberDay = date.getDate()
      for (let order of orders) {
        if (format(new Date(order.date), 'yyyy-mm-dd') === format(date, 'yyyy-mm-dd')) {
          ordersInDate.push(order)
        }
      }
      daysInMonth.push(<td>
        <div className='calendar__calendar-body__day'>{date.getDate()}</div>
        <div className='calendar__calendar-body__data'>{ordersInDate.map(order => (
          <div className='calendar__calendar-body__data__order'>city: {order.city.name} master: {order.master.name}</div>
        ))}</div>
      </td>)
      date.setDate(numberDay + 1)
    }

    if (getDay(date) !== 0) {
      for (let i = getDay(date); i < 7; i++) {
        endBlanks.push(<td className='calendar__calendar-body__day end-empty' key={`end-empty-${i}`}>{''}</td>)
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

    let calendar = rows.map(row => {
      return <TableRow className='calendar__calendar-body__row'>{row}</TableRow>
    })

    return (
      <div className='dashboard'>
        <div className='dashboard__title-calendar'>Year: {year}      Month: { month }</div>
        <Paper className='dashboard__calendar-background'>
          <Table className='calendar'>
            <TableHead>
              <TableRow className='calendar__week-title'>
                <TableCell className='calendar__week-title__day'>Monday</TableCell>
                <TableCell className='calendar__week-title__day'>Tuesday</TableCell>
                <TableCell className='calendar__week-title__day'>Wednesday</TableCell>
                <TableCell className='calendar__week-title__day'>Thursday</TableCell>
                <TableCell className='calendar__week-title__day'>Friday</TableCell>
                <TableCell className='calendar__week-title__day'>Saturday</TableCell>
                <TableCell className='calendar__week-title__day'>Sunday</TableCell>
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
    orders: state.orderReducer.data
  }
}

export default connect(
  mapStateToProps,
  null
)(Dashboard)
