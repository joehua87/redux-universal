import { combineReducers } from 'redux'
// import { reducer as reduxAsyncConnect } from 'redux-async-connect'

import counter from './counter'
import user from './user'
import userDetail from './userDetail'

const rootReducer = combineReducers({
  // reduxAsyncConnect, // Able to remove this if go with 'redial'
  counter,
  user,
  userDetail
})

export default rootReducer
