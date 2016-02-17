import { combineReducers } from 'redux'
import { reducer as local } from 'redux-react-local'
import counter from './counter'
import user from './user'
import userDetail from './userDetail'
import home from './home'
import category from './category'
import tag from './tag'
import post from './post'

const rootReducer = combineReducers({
  local,
  home,
  counter,
  user,
  userDetail,
  category,
  tag,
  post
})

export default rootReducer
