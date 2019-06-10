import {
    TOGGLE_MODAL_REGISTER,
    TOGGLE_MODAL_LOGIN
} from '../actions/types';

const initialState = {
    isActiveLogin: false,
    isActiveRegister: false,
};

const clientReducers = (state = initialState, action) => {

    switch (action.type) {
        case TOGGLE_MODAL_REGISTER:
            return {
                ...state,
                isActiveRegister: !state.isActiveRegister
            };

        case TOGGLE_MODAL_LOGIN:
            return {
                ...state,
                isActiveLogin: !state.isActiveLogin
            };

        default:
            return state
    }
};

export default clientReducers;