import {
  LOAD_CATEGORIES_START, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAIL,
  LOAD_TAGS_START, LOAD_TAGS_SUCCESS, LOAD_TAGS_FAIL
} from '../../actions/home'

const initialState = {
  isLoadingTags: false,
  isLoadingCategories: false,
  categoryCount: 0,
  categories: [],
  tagCount: 0,
  tags: [],
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_CATEGORIES_START:
      return {
        ...state,
        isLoadingCategories: true
      }
    case LOAD_CATEGORIES_FAIL:
      return {
        ...state,
        isLoadingCategories: false,
        categories: [],
        categoryCount: 0,
        error: action.payload
      }
    case LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoadingCategories: false,
        error: null,
        categories: action.payload.entities,
        categoryCount: action.payload.count
      }
    case LOAD_TAGS_START:
      return {
        ...state,
        isLoadingTags: true
      }
    case LOAD_TAGS_FAIL:
      return {
        ...state,
        isLoadingTags: false,
        tags: [],
        tagCount: 0,
        error: action.payload
      }
    case LOAD_TAGS_SUCCESS:
      return {
        ...state,
        isLoadingTags: false,
        error: null,
        tags: action.payload.entities,
        tagCount: action.payload.count
      }
    default:
      return state
  }
}
