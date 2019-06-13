import {
    TOGGLE_MODAL_REGISTER,
    TOGGLE_MODAL_LOGIN,
    TOGGLE_AUTHORIZATION
} from '../actions/types';

const initialState = {
    isAuthorization: false,
    showModal: {
        isActiveLogin: false,
        isActiveRegister: false
    },
    orderFormData: {
        clock: [
            {
                name: 'small',
                timeRepair: 1
            },
            {
                name: 'medium',
                timeRepair: 2
            },
            {
                name: 'big',
                timeRepair: 3
            }
        ],
        cities: [
            'Dnipro',
            'Uzhgorod'
        ]
    }
};

const clientReducer = (state = initialState, action) => {

    switch (action.type) {
        case TOGGLE_MODAL_REGISTER:
            return {
                ...state,
                showModal:
                    {
                        ...state.showModal,
                        isActiveRegister: !state.showModal.isActiveRegister
                    }
            };

        case TOGGLE_MODAL_LOGIN:
            return {
                ...state,
                showModal:
                    {
                        ...state.showModal,
                        isActiveLogin: !state.showModal.isActiveLogin
                    }
            };

        case TOGGLE_AUTHORIZATION:
            return {
                ...state,
                isAuthorization: !state.isAuthorization
            };

        default:
            return state
    }
};

export default clientReducer;