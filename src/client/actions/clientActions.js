import {
    TOGGLE_MODAL_LOGIN,
    TOGGLE_MODAL_REGISTER,
    TOGGLE_AUTHORIZATION
} from './types.js'

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

export const toggleAuthorization = () => {
    return {
        type: TOGGLE_AUTHORIZATION,
    }
}