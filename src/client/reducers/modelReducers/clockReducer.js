import {
  LOAD_CLOCKS_STARTED,
  LOAD_CLOCKS_SUCCESS,
  LOAD_CLOCKS_FAILURE,
  ADD_CLOCKS_STARTED,
  ADD_CLOCKS_FAILURE,
  ADD_CLOCKS_SUCCESS,
  DELETE_CLOCKS_STARTED,
  DELETE_CLOCKS_FAILURE,
  DELETE_CLOCKS_SUCCESS,
  EDIT_CLOCKS_STARTED,
  EDIT_CLOCKS_FAILURE,
  EDIT_CLOCKS_SUCCESS
} from '../../actions/types.js'

const initialState = {
  error: null,
  data: []
}

const clockReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CLOCKS_STARTED:
      return {
        ...state
      }

    case LOAD_CLOCKS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        error: null
      }

    case LOAD_CLOCKS_FAILURE:
      return {
        ...state,
        data: [],
        error: action.payload
      }

    case ADD_CLOCKS_STARTED:
      return {
        ...state
      }

    case ADD_CLOCKS_SUCCESS:
      return {
        ...state,
        data: [
            ...state.data.data,
            action.payload
          ]
      }

    case ADD_CLOCKS_FAILURE:
      return {
        ...state,
        error: action.payload
      }

    case EDIT_CLOCKS_STARTED:
      return {
        ...state
      }

    case EDIT_CLOCKS_SUCCESS:
      return {
        ...state,
        data: state.data.map(clock => {
            if (clock.id === Number(action.payload.id)) {
              action.payload.id = Number(action.payload.id)
              action.payload.timeRepair = Number(action.payload.timeRepair)
              return action.payload
            }
            return clock
          })

      }

    case EDIT_CLOCKS_FAILURE:
      return {
        ...state,
        error: action.payload
      }

    case DELETE_CLOCKS_STARTED:
      return {
        ...state
      }

    case DELETE_CLOCKS_SUCCESS:
      return {
        ...state,
        data: state.data.filter(el => el.id !== action.payload.id)

      }

    case DELETE_CLOCKS_FAILURE:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default clockReducer
