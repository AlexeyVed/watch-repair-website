import React from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import LinkButton from '../../LinkButton/LinkButton.jsx'
import { deleteWorkerFromDB, loadCities, loadWorkers } from '../../../actions'
import AddWorkers from '../RefactorWorkers/AddWorkers.jsx'
import EditWorkers from '../RefactorWorkers/EditWorkers.jsx'

import './RefactorWorkers.less'

class RefactorWorkers extends React.Component {
  componentDidMount () {
    this.props.loadWorkers()
    this.props.loadCities()
  }
  render () {
    const { workers, deleteWorker } = this.props

    return (
      <div className='table-workers'>
        <div className='table-workers__title'>Our Workers</div>
        <div className='table-workers__table'>
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Where work</th>
                <th>Rating</th>
                <th>Service</th>
              </tr>
              { workers.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{(item.city !== null) ? item.city.city : <b>City was deleted</b>}</td>
                  <td>{item.rating}</td>
                  <td>
                    <LinkButton to={`/admin/workers/edit/${item.id}`} name='Edit'/>
                    <button onClick={ () => deleteWorker(item.id) }>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='table-workers__bttn-add'>
          <LinkButton to='/admin/workers/add' name='Add'/>
        </div>
        <Switch>
          <Route path='/admin/workers/add' component={AddWorkers}/>
          <Route path='/admin/workers/edit/:id' component={EditWorkers}/>
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    workers: state.adminReducer.data.workers
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteWorker: id => dispatch(deleteWorkerFromDB(id)),
    loadWorkers: () => dispatch(loadWorkers()),
    loadCities: () => dispatch(loadCities())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RefactorWorkers)
