import { CALL_API } from '../redux/middleware/fetcher'

const debug = require('debug')('redux-universal:actions:user')

export const LOAD_START = 'user/LOAD_START'
export const LOAD_SUCCESS = 'user/LOAD_SUCCESS'
export const LOAD_FAIL = 'user/LOAD_FAIL'

export function getUsers() {
  const keyword = ''
  const repos = 10
  const followers = 100

  debug('Get Users', { keyword, repos, followers })
  return {
    [CALL_API]: {
      types: [LOAD_START, LOAD_SUCCESS, LOAD_FAIL],
      endpoint: 'https://api.github.com/search/users',
      method: 'get',
      params: {
        q: `${keyword}+repos:>${repos}+followers:>${followers}`,
      }
    }
  }
}
