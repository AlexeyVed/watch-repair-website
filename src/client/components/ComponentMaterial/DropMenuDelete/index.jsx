import React from 'react'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Paper from '@material-ui/core/Paper'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

import './DropMenuDelete.less'

const ClickAway = props => {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(prev => !prev)
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  return (
    <div className='root-drop-menu'>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <button onClick={handleClick}><DeleteOutlineRoundedIcon/></button>
          {open ? (
            <Paper className='root-drop-menu__paper'>
              <div className='root-drop-menu__header'>{props.text}</div>
              <div className='root-drop-menu__container-button'>
                <div className='half-width'>
                  <button className='button-delete-model' onClick={ () => { props.DropDelete(props.itemId) }}><CheckIcon/></button>
                </div>
                <div className='half-width'>
                  <button className='button-close-delete' onClick={ handleClickAway }><CloseIcon/></button>
                </div>
              </div>
            </Paper>
          ) : null}
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default ClickAway
