export const LOAD_START = 'user/LOAD_START'
export const LOAD_SUCCESS = 'user/LOAD_SUCCESS'
export const LOAD_FAIL = 'user/LOAD_FAIL'

export const getUsers = ({ keyword = '', repos = 10, followers = 100 }) => ({
  types: [LOAD_START, LOAD_SUCCESS, LOAD_FAIL],
  promise: (client) => client.get(`https://api.github.com/search/users?q=${keyword}+repos:>${repos}+followers:>${followers}`)
})
