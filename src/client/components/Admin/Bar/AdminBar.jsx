import React from 'react'
import { connect } from 'react-redux'
import EventIcon from '@material-ui/icons/Event'
import LinkButton from '../../LinkButton/LinkButton.jsx'

import './AdminBar.less'

class AdminBar extends React.Component {
  componentDidUpdate (prevProps, prevState) {
    const buttons = document.querySelectorAll('.button-bar')
    buttons.forEach(button => {
      if (button.classList.contains(this.props.page)) {
        button.classList.add('active')
      } else {
        button.classList.remove('active')
      }
    })
  }

  render () {
    return (
      <div className='bar-choose-item'>
        <div className="bar-choose-item__buttons">
          <LinkButton className='button-bar board' to='/admin' name={ <EventIcon/> }/>
          <LinkButton className='button-bar orders' to='/admin/orders' name='Control orders'/>
          <LinkButton className='button-bar cities' to='/admin/cities' name='Control cities'/>
          <LinkButton className='button-bar masters' to='/admin/workers' name='Control masters'/>
          <LinkButton className='button-bar clocks' to='/admin/clocks' name='Control clocks'/>
          <LinkButton className='button-bar customers' to='/admin/clients' name='Control clients'/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.appReducer.page
  }
}

export default connect(
  mapStateToProps,
  null
)(AdminBar)
