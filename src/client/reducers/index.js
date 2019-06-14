import {combineReducers} from 'redux';
import {reducer as formReducer} from "redux-form";

import appReducer from './appReducer.js'
import adminReducer from './adminReducer.js'


const reducers = {
    form: formReducer,
    appReducer,
    adminReducer
};


const rootReducer = combineReducers(reducers);

export default rootReducer;