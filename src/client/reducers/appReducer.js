import {
  SET_CLOCKS,
  SET_CITIES
} from '../actions/types'

const initialState = {
  orderFormData: {
    clocks: [],
    cities: []
  }
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CLOCKS:
      return {
        ...state,
        orderFormData: {
          ...state.orderFormData,
          clocks: action.payload
        }
      }

    case SET_CITIES:
      return {
        ...state,
        orderFormData:
                    {
                      ...state.orderFormData,
                      cities: action.payload
                    }
      }

    default:
      return state
  }
}

export default appReducer
