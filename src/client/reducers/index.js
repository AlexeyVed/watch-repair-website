import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import appReducer from './appReducer.js'
import adminReducer from './adminReducer.js'
import loginReducer from './loginReducer.js'

const reducers = {
  form: formReducer,
  appReducer,
  adminReducer,
  loginReducer
}

const rootReducer = combineReducers(reducers)

export default rootReducer
