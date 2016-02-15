export const LOAD_START = 'userDetail/LOAD_START'
export const LOAD_SUCCESS = 'userDetail/LOAD_SUCCESS'
export const LOAD_FAIL = 'userDetail/LOAD_FAIL'

export const getUser = (username) => ({
  types: [LOAD_START, LOAD_SUCCESS, LOAD_FAIL],
  promise: (client) => client.get(`https://api.github.com/users/${username}`)
})
