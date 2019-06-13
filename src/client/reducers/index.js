import {combineReducers} from 'redux';
import {reducer as formReducer} from "redux-form";

import clientReducer from './clientReducer.js'
import adminReducer from './adminReducer.js'


const reducers = {
    form: formReducer,
    clientReducer,
    adminReducer
};


const rootReducer = combineReducers(reducers);

export default rootReducer;