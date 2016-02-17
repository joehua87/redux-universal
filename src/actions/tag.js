import { CALL_API } from '../redux/middleware/fetcher'
const debug = require('debug')('redux-universal:actions:tag')

export const LOAD_POSTS_START = 'tag/LOAD_POSTS_START'
export const LOAD_POSTS_SUCCESS = 'tag/LOAD_POSTS_SUCCESS'
export const LOAD_POSTS_FAIL = 'tag/LOAD_POSTS_FAIL'

const env = process.env.NODE_ENV || 'dev'
const config = require('../config')[env]

const endpoint = `${config.apiEndpoint}`

export function loadPosts(tag) {
  debug(`Get Posts by Tag: ${tag}`)
  return {
    [CALL_API]: {
      endpoint: `${endpoint}/post/query`,
      types: [LOAD_POSTS_START, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAIL],
      method: 'get',
      params: { filter: { tag }, getAll: true }
    }
  }
}
