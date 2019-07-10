import React from 'react'
import { connect } from 'react-redux'
import LinkButton from '../../LinkButton/LinkButton.jsx'



import { changeAdminView } from '../../../actions'

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

          </div>
        </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeView: view => dispatch(changeAdminView(view))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminBar)