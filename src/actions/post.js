import { CALL_API } from '../redux/middleware/fetcher'
const debug = require('debug')('redux-universal:actions:post')

export const LOAD_POST_START = 'tag/LOAD_POST_START'
export const LOAD_POST_SUCCESS = 'tag/LOAD_POST_SUCCESS'
export const LOAD_POST_FAIL = 'tag/LOAD_POST_FAIL'

const env = process.env.NODE_ENV || 'dev'
const config = require('../config')[env]

const endpoint = `${config.apiEndpoint}`

export function loadPost(slug) {
  debug(`Get Post by slug: ${slug}`)
  return {
    [CALL_API]: {
      endpoint: `${endpoint}/post/detail/${slug}`,
      types: [LOAD_POST_START, LOAD_POST_SUCCESS, LOAD_POST_FAIL],
      method: 'get',
    }
  }
}
