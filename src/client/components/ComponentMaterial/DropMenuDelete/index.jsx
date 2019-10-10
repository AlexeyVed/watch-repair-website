import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Paper from '@material-ui/core/Paper'
import DeleteOutlineRoundedIcon from '@material-ui/icons/DeleteOutlineRounded'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    fontSize: '14px',
    fontWeight: 'bold',
    width: '49px',
    display: 'inline-block',
    borderLeft: '1px solid gray'
  },
  paper: {
    position: 'absolute',
    top: 10,
    right: 30,
    boxSizing: 'content-box',
    minWidth: '120px',
    display: 'flex',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
    border: '1px solid gray',
    flexDirection: 'column',
    backgroundColor: '#e3eff0',
    zIndex: 1
  },
  header: {
    flex: '1 0 30px',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    justifyContent: 'center'
  },
  container: {
    flex: '0 0 40px',
    display: 'flex',
    padding: '0 0 5px 0'
  }
}))

const ClickAway = props => {
  const [open, setOpen] = React.useState(false)
  const classes = useStyles()

  const handleClick = () => {
    setOpen(prev => !prev)
  }

  const handleClickAway = () => {
    setOpen(false)
  }

  return (
    <div className={classes.root}>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div>
          <button onClick={handleClick}><DeleteOutlineRoundedIcon/></button>
          {open ? (
            <Paper className={classes.paper}>
              <div className={classes.header}>{props.text}</div>
              <div className={classes.container}>
                <button className='button-delete-model' onClick={ () => { props.DropDelete(props.itemId) }}><CheckIcon/></button>
                <button className='button-close-delete' onClick={ handleClickAway }><CloseIcon/></button>
              </div>
            </Paper>
          ) : null}
        </div>
      </ClickAwayListener>
    </div>
  )
}

export default ClickAway
