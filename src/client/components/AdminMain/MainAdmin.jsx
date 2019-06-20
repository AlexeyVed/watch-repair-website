import React from 'react'

import AdminBar from '../AdminBar/AdminBar.jsx'
import AdminContent from '../AdminContent/AdminContent.jsx'
import './MainAdmin.less'

export default class MainAdmin extends React.Component {
  render () {
    return (
      <div className='admin-main'>
        <AdminBar/>
        <AdminContent/>
      </div>
    )
  }
}
