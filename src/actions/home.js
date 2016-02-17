import { CALL_API } from '../redux/middleware/fetcher'
const debug = require('debug')('redux-universal:actions:home')

export const LOAD_CATEGORIES_START = 'home/LOAD_CATEGORIES_START'
export const LOAD_CATEGORIES_SUCCESS = 'home/LOAD_CATEGORIES_SUCCESS'
export const LOAD_CATEGORIES_FAIL = 'home/LOAD_CATEGORIES_FAIL'

export const LOAD_TAGS_START = 'home/LOAD_TAGS_START'
export const LOAD_TAGS_SUCCESS = 'home/LOAD_TAGS_SUCCESS'
export const LOAD_TAGS_FAIL = 'home/LOAD_TAGS_FAIL'

const env = process.env.NODE_ENV || 'dev'
const config = require('../config')[env]

const endpoint = `${config.apiEndpoint}`

export function loadCategories() {
  debug(`Get all Categories`)
  return {
    [CALL_API]: {
      endpoint: `${endpoint}/category/query`,
      types: [LOAD_CATEGORIES_START, LOAD_CATEGORIES_SUCCESS, LOAD_CATEGORIES_FAIL],
      method: 'get'
    }
  }
}

export function loadTags() {
  debug(`Get all Tags`)
  return {
    [CALL_API]: {
      endpoint: `${endpoint}/tag/query`,
      types: [LOAD_TAGS_START, LOAD_TAGS_SUCCESS, LOAD_TAGS_FAIL],
      method: 'get'
    }
  }
}
