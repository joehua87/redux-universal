import { LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL } from '../../actions/tag'

const initialState = {
  isLoading: false,
  count: 0,
  entities: []
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_POSTS_START:
      return {
        ...state,
        isLoading: true
      }
    case LOAD_POSTS_FAIL:
      return {
        ...state,
        isLoading: false,
        entities: [],
        count: 0,
        error: action.payload
      }
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        ...action.payload, // including entities, limit, page, count
      }
    default:
      return state
  }
}
