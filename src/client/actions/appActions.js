import {
  SET_CITIES,
  SET_CLOCKS
} from './types.js'

export const setCitiesToState = (obj) => {
  return {
    type: SET_CITIES,
    payload: obj
  }
}

export const setClocksToState = (obj) => {
  return {
    type: SET_CLOCKS,
    payload: obj
  }
}
