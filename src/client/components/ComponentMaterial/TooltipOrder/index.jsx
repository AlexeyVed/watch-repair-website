import React from 'react'
import Tooltip from '@material-ui/core/Tooltip'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm'
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew'
import LocationCityIcon from '@material-ui/icons/LocationCity'
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder'
import BuildIcon from '@material-ui/icons/Build'

import './TooltipOrder.less'

const TriggersTooltips = props => {
  const [open, setOpen] = React.useState(false)
  const { master, city, clock, time, duration, customer, num } = props

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }

  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Tooltip
        PopperProps={{
          disablePortal: true
        }}
        onClose={handleTooltipClose}
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={
          <div className='container-tooltip-text'>
            <div><AccessibilityNewIcon/> : {customer}</div>
            <div><QueryBuilderIcon/> : {time}:00-{time + duration}:00</div>
            <div><LocationCityIcon/> : {city}</div>
            <div><BuildIcon/> : {master}</div>
            <div><AccessAlarmIcon/> : {clock}</div>
          </div>
        }
      >
        <div className='calendar__calendar-body__data__order' onClick={handleTooltipOpen}>
          {num}. {time}:00-{time + duration}:00, {city}
        </div>
      </Tooltip>
    </ClickAwayListener>
  )
}

export default TriggersTooltips
