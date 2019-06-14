import {
    CHANGE_ADMIN_VIEW
} from '../actions/types';


const initialState = {
    view: null,
};

const adminReducer = (state = initialState, action) => {

    switch (action.type) {

        case CHANGE_ADMIN_VIEW:
            return {
                ...state,
                view: action.payload
            };


        default:
            return state
    }
    return state
};

export default adminReducer;