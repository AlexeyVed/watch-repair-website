import {
    TOGGLE_IS_ADMIN
} from '../actions/types';

const initialState = {
    isAdmin: false,
};

const adminReducer = (state = initialState, action) => {

    switch (action.type) {
        case TOGGLE_IS_ADMIN:
            return {
                ...state,
                isAdmin: !state.isAdmin
            };


        default:
            return state
    }
};

export default adminReducer;