import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import { deleteClockFromDB } from '../../../actions'
import AddClocks from '../RefactorClocks/AddClocks.jsx'
import EditClocks from '../RefactorClocks/EditClocks.jsx'

import './RefactorClocks.less'

class RefactorClocks extends React.Component {
  render () {
    const { clocks, deleteClock } = this.props

    return (
      <div className='table-clocks'>
        <div className='table-clocks__title'>Which clock we repair</div>
        <div className='table-clocks__table'>
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Type of Clock</th>
                <th>Time of repair</th>
                <th>Service</th>
              </tr>
              { clocks.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.typeClock}</td>
                  <td>{item.timeRepair}</td>
                  <td>
                    <LinkButton to={`/admin/clocks/edit/${item.id}/${item.typeClock}/${item.timeRepair}`} name='Edit'/>
                    <button onClick={ () => deleteClock(item.id) }>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='table-clocks__bttn-add'>
          <LinkButton to='/admin/clocks/add' name='Add'/>
        </div>
        <Switch>
          <Route path='/admin/clocks/add' component={AddClocks}/>
          <Route path='/admin/clocks/edit/:id/:typeClock/:timeRepair' component={EditClocks}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    clocks: state.adminReducer.data.clocks

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteClock: id => dispatch(deleteClockFromDB(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorClocks)
