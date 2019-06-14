import {
    TOGGLE_MODAL_REGISTER,
    TOGGLE_MODAL_LOGIN,
    TOGGLE_AUTHORIZATION,
    SET_CLOCKS,
    SET_CITIES, TOGGLE_IS_ADMIN
} from '../actions/types';

const initialState = {
    isAuthorization: false,
    isAdmin: false,
    currentUser: null,
    showModal: {
        isActiveLogin: false,
        isActiveRegister: false
    },
    orderFormData: {
        clocks: [],
        cities: []
    }
};

const appReducer = (state = initialState, action) => {

    switch (action.type) {
        case TOGGLE_MODAL_REGISTER:
            return {
                ...state,
                showModal: {
                    ...state.showModal,
                    isActiveRegister: !state.showModal.isActiveRegister
                }
            };

        case TOGGLE_MODAL_LOGIN:
            return {
                ...state,
                showModal: {
                    ...state.showModal,
                    isActiveLogin: !state.showModal.isActiveLogin
                }
            };

        case SET_CLOCKS:
            return {
                ...state,
                orderFormData: {
                    ...state.orderFormData,
                    clocks: action.payload
                }
            };

        case SET_CITIES:
            return {
                ...state,
                orderFormData:
                    {
                        ...state.orderFormData,
                        cities: action.payload
                    }
            };
        case TOGGLE_IS_ADMIN:
            return {
                ...state,
                isAdmin: !state.isAdmin
            };

        default:
            return state
    }
};

export default appReducer;