import { LOAD_POST_START, LOAD_POST_SUCCESS, LOAD_POST_FAIL } from '../../actions/post'

const initialState = {
  isLoading: false,
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_POST_START:
      return {
        ...state,
        isLoading: true
      }
    case LOAD_POST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      }
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        post: action.payload
      }
    default:
      return state
  }
}
