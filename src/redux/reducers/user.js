import { LOAD_START, LOAD_SUCCESS, LOAD_FAIL } from '../../actions/user'

const initialState = {
  isLoading: false,
  count: 0,
  entities: []
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
        entities: [],
        count: 0,
        error: action.payload
      }
    case LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        entities: action.payload.items,
        count: action.payload.total_count,
        error: null
      }
    default:
      return state
  }
}
