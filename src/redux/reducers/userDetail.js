import { LOAD_START, LOAD_SUCCESS, LOAD_FAIL } from '../../actions/userDetail'

const initialState = {
  isLoading: false,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_START:
      return {
        ...state,
        isLoading: true
      }
    case LOAD_FAIL:
      return {
        ...state,
        isLoading: false,
        user: null,
        error: action.payload
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null
      }
    default:
      return state
  }
}
