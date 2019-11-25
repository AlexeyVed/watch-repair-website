import React from 'react'
import Portal from '@material-ui/core/Portal'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import BuildIcon from '@material-ui/icons/Build'
import { format } from 'date-fns'

import './PortalOrdersInDate.less'

const SimplePortal = props => {
  const [show, setShow] = React.useState(false)
  const container = document.getElementById('modal-root') || document.createElement('div')
  const { orders, day, year, month } = props

  const handleClick = () => {
    setShow(true)
  }

  const handleClickAway = () => {
    setShow(false)
  }

  return (
    <div className='calendar__calendar-body__data-for-responsive' onClick={handleClick}>
      <div className='calendar__calendar-body__day'>{day}</div>
      {orders.length !== 0 &&
    <div className='calendar__calendar-body__data-for-responsive__container'>
      <div className='calendar__calendar-body__data-for-responsive__container__title'>{orders.length}</div>
      <div className='calendar__calendar-body__data-for-responsive__container__title'><AccessAlarmIcon/> </div>
      {show ? (
        <Portal container={container}>
          <div className='orders-portal'>
            <ClickAwayListener onClickAway={handleClickAway}>
              <div className='orders-portal__window'>
                <div className='orders-portal__window__container'>
                  <div className='orders-portal__window__container__text'>
                    All orders on {format(new Date(year, month, day), 'MMMM, dd')}
                  </div>
                  <div className='orders-portal__window__container__orders'>
                    {orders.map(order => (
                      <div className='orders-portal__window__container__orders__order' key={`order-portal-${order.id}`}>
                        <div><AccessibilityNewIcon/> : {order.customer.name}</div>
                        <div><AccessAlarmIcon/> : {order.clock.name}</div>
                        <div><LocationCityIcon/> : {order.city.name}</div>
                        <div><BuildIcon/> : {order.master.name}</div>
                        <div><QueryBuilderIcon/> : {order.time}:00 - {order.time + order.duration}:00</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ClickAwayListener>
          </div>
        </Portal>
      ) : null}
    </div>}
    </div>
  )
}

export default SimplePortal
