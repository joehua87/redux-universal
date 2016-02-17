import { CALL_API } from '../redux/middleware/fetcher'
const debug = require('debug')('redux-universal:actions:category')

export const LOAD_POSTS_START = 'category/LOAD_POSTS_START'
export const LOAD_POSTS_SUCCESS = 'category/LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAIL = 'category/LOAD_POSTS_FAIL'

const env = process.env.NODE_ENV || 'dev'
const config = require('../api/config')[env]

const endpoint = `http://localhost:${config.port}`

export function loadPosts(category) {
  debug(`Get Posts by Category: ${category}`)
  return {
    [CALL_API]: {
      endpoint: `${endpoint}/post/query`,
      types: [LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL],
      method: 'get',
      params: { filter: { category }, getAll: true }
    }
  }
}
