import { CALL_API } from '../redux/middleware/fetcher'

export const LOAD_START = 'userDetail/LOAD_START'
export const LOAD_SUCCESS = 'userDetail/LOAD_SUCCESS'
export const LOAD_FAIL = 'userDetail/LOAD_FAIL'

const debug = require('debug')('redux-universal:actions:userDetail')

export function getUser(username) {
  debug('Get User Detail', username)
  return {
    [CALL_API]: {
      types: [LOAD_START, LOAD_SUCCESS, LOAD_FAIL],
      endpoint: `https://api.github.com/users/${username}`,
      method: 'get'
    }
  }
}
