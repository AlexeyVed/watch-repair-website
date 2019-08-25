import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import appReducer from './appReducer.js'
import loginReducer from './loginReducer.js'

import cityReducer from './modelReducers/cityReducer.js'
import clockReducer from './modelReducers/clockReducer.js'
import customerReducer from './modelReducers/customerReducer.js'
import masterReducer from './modelReducers/masterReducer.js'
import orderReducer from './modelReducers/orderReducer.js'

const reducers = {
  form: formReducer,
  appReducer,
  loginReducer,
  cityReducer,
  clockReducer,
  customerReducer,
  masterReducer,
  orderReducer
}

const rootReducer = combineReducers(reducers)

export default rootReducer
