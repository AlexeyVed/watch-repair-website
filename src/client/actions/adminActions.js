import {
    TOGGLE_IS_ADMIN
} from './types.js'

export const toggleAdminMode = () => {
    return {
        type: TOGGLE_IS_ADMIN,
    }
};
