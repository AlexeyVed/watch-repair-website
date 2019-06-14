import {
    TOGGLE_MODAL_LOGIN,
    TOGGLE_MODAL_REGISTER,
    TOGGLE_IS_ADMIN,
    SET_CITIES,
    SET_CLOCKS
} from './types.js'


export const toggleAdminMode = () => {
    return {
        type: TOGGLE_IS_ADMIN,
    }
};

export const toggleModalLogin = () => {
    return {
        type: TOGGLE_MODAL_LOGIN,
    }
};

export const toggleModalRegister = () => {
    return {
        type: TOGGLE_MODAL_REGISTER,
    }
};

export const setCitiesToState = (obj) => {
    return {
        type: SET_CITIES,
        payload: obj
    }
};

export const setClocksToState = (obj) => {
    return {
        type: SET_CLOCKS,
        payload: obj
    }
};
