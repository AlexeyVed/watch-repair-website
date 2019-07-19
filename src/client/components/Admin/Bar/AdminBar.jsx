import React from 'react'
import { connect } from 'react-redux'
import LinkButton from '../../LinkButton/LinkButton.jsx'

import './AdminBar.less'

class AdminBar extends React.Component {
  render () {
    return (
      <div className='bar-choose-item'>
        <div className='bar-choose-item__title'>What dо you want change?</div>
        <div className="bar-choose-item__buttons">
          <LinkButton to='/admin/cities' name='Control cities'/>
          <LinkButton to='/admin/workers' name='Control workers'/>
          <LinkButton to='/admin/clocks' name='Control clocks'/>
          <LinkButton to='/admin/clients' name='Control clients'/>
          <LinkButton to='/admin/orders' name='Control orders'/>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  null
)(AdminBar)
