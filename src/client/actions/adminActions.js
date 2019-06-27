import {
  CHANGE_ADMIN_VIEW
} from './types.js'

export const changeAdminView = view => {
  return {
    type: CHANGE_ADMIN_VIEW,
    payload: view
  }
}
